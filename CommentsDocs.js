class CommentsDocs {
  constructor() {
    this.reader = null;
    this.sidePanel = null;
    this.rootElement = null;
    this.activePageId = 'meta';
    this._safeAreaHandler = null;
  }

  async run(env) {
    if (this.rootElement) {
      this.destroy();
    }

    if (!env || !env.container) {
      throw new Error('[CommentsDocs] run() requires an environment container.');
    }

    this.env = env;
    this.rootElement = env.container;
    this.rootElement.innerHTML = '';

    // Synchronize Community profiles into memory if CommunityOracle exists
    if (typeof CommunityOracle !== 'undefined') {
      CommunityOracle.loadProfiles();
    }

    // Mount the live Comments application
    if (typeof Comments !== 'undefined') {
      this.commentsApp = new Comments();
      await this.commentsApp.run({ container: this.rootElement });
      return this;
    }

    // Fallback: render minimal wrapper
    const wrap = makeElement('div', {
      style: { padding: '40px', maxWidth: '840px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }
    }, [
      makeElement('h1', { style: { color: '#00f2fe' } }, 'Comments & Community Identity Engine'),
      makeElement('p', { style: { color: '#94a3b8' } }, 'Comments is initialized and connected to the Community Oracle.')
    ]);
    this.rootElement.appendChild(wrap);
    return this;
  }
  _buildSidePanelNavigation(pages) {
      if (!this.sidePanel) return;

      globalThis._commentsDocsInstance = this;
      globalThis._cadPlanInstance = this;

      this.sidePanel.header.innerHTML = '';
      const headerTitle = document.createElement('div');
      headerTitle.style.cssText = 'font-family: var(--cp-font-mono, monospace); font-size: 11px; font-weight: 800; color: #00f2fe; display: flex; align-items: center; gap: 8px; flex: 1;';
      headerTitle.innerHTML = '<span>💬</span><span>Comments System Workspace</span>';

      const closeBtn = document.createElement('button');
      closeBtn.className = 'dr-nav-btn';
      closeBtn.style.cssText = 'padding: 3px 8px; font-size: 10px; border-radius: 4px;';
      closeBtn.textContent = '✕';
      closeBtn.onclick = () => this.sidePanel.close();

      this.sidePanel.header.appendChild(headerTitle);
      this.sidePanel.header.appendChild(closeBtn);

      const container = this.sidePanel.contentContainer;
      container.innerHTML = '';
      container.style.cssText = 'flex: 1; overflow-y: auto; overflow-x: hidden; padding: 12px; display: flex; flex-direction: column; gap: 10px;';

      const searchInput = document.createElement('input');
      searchInput.className = 'cp-sidebar-search';
      searchInput.placeholder = '🔍 Filter chapters, labs, or topics...';
      searchInput.oninput = (e) => {
        const q = e.target.value.toLowerCase().trim();
        container.querySelectorAll('.cp-chapter-card').forEach(card => {
          const text = card.textContent.toLowerCase();
          card.style.display = (!q || text.includes(q)) ? 'block' : 'none';
        });
      };
      container.appendChild(searchInput);

      const chaptersWrapper = document.createElement('div');
      chaptersWrapper.style.cssText = 'display: flex; flex-direction: column; gap: 6px;';

      const localMap = (typeof CommentsItemNotes !== 'undefined') ? CommentsItemNotes.getLocalMap() : ((typeof CadPlanItemNotes !== 'undefined') ? CadPlanItemNotes.getLocalMap() : {});

      pages.forEach((page) => {
        const doc = page.docClass ? page.docClass() : null;
        const manifest = doc?.manifest ? doc.manifest() : [];
        const isCur = page.id === this.activePageId;

        let chapterNotesCount = 0;
        Object.keys(localMap).forEach(k => {
          if (k.includes(`:${page.id}:`)) {
            chapterNotesCount += (localMap[k] || []).filter(n => n.status !== 'resolved').length;
          }
        });

        const hasLab = manifest.some(sec => (sec.blocks || []).some(b => b.type === 'component'));

        const card = document.createElement('div');
        card.className = `cp-chapter-card ${isCur ? 'active' : ''}`;
        card.dataset.pageId = page.id;

        const headerRow = document.createElement('div');
        headerRow.className = 'cp-chapter-header-row';

        const leftGroup = document.createElement('div');
        leftGroup.style.cssText = 'display: flex; align-items: center; gap: 8px; flex: 1; overflow: hidden;';

        const chevron = document.createElement('span');
        chevron.className = 'cp-chapter-chevron';
        chevron.style.cssText = 'font-size: 8px; color: #64748b; width: 10px; flex-shrink: 0;';
        chevron.textContent = isCur ? '▼' : '▶';

        const titleText = document.createElement('span');
        titleText.style.cssText = 'font-family: var(--cp-font-sans); font-size: 11px; font-weight: 700; color: #f8fafc; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;';
        titleText.textContent = page.title;

        leftGroup.appendChild(chevron);
        leftGroup.appendChild(titleText);
        headerRow.appendChild(leftGroup);

        const badgesGroup = document.createElement('div');
        badgesGroup.style.cssText = 'display: flex; gap: 4px; align-items: center; flex-shrink: 0;';

        if (hasLab) {
          const labBadge = document.createElement('span');
          labBadge.style.cssText = 'background: rgba(245, 158, 11, 0.18); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.4); font-size: 8.5px; padding: 1px 5px; border-radius: 4px; font-weight: 800; font-family: var(--cp-font-mono);';
          labBadge.textContent = '⚡ Lab';
          badgesGroup.appendChild(labBadge);
        }

        if (chapterNotesCount > 0) {
          const noteBadge = document.createElement('span');
          noteBadge.style.cssText = 'background: rgba(0, 242, 254, 0.2); color: #00f2fe; border: 1px solid #00f2fe88; font-size: 9px; padding: 1px 6px; border-radius: 10px; font-weight: 800; font-family: monospace;';
          noteBadge.textContent = `${chapterNotesCount} 📝`;
          badgesGroup.appendChild(noteBadge);
        }

        headerRow.appendChild(badgesGroup);
        card.appendChild(headerRow);

        const sectionsList = document.createElement('div');
        sectionsList.className = 'cp-chapter-sections-list';
        sectionsList.style.display = isCur ? 'flex' : 'none';

        manifest.forEach((sec) => {
          const secItem = document.createElement('div');
          secItem.className = 'cp-section-item';
          secItem.textContent = `• ${sec.title}`;
          secItem.title = sec.title;

          secItem.onclick = (e) => {
            e.stopPropagation();
            if (this.activePageId !== page.id) {
              this.selectChapter(page.id);
            }
            const firstBlockId = sec.blocks?.[0]?.id;
            if (firstBlockId && this.reader) {
              setTimeout(() => this.reader.highlightTarget(firstBlockId), 150);
            }
          };

          sectionsList.appendChild(secItem);
        });

        card.appendChild(sectionsList);

        headerRow.onclick = () => {
          this.selectChapter(page.id);
        };

        chaptersWrapper.appendChild(card);
      });
      container.appendChild(chaptersWrapper);

      const settingsDet = document.createElement('details');
      settingsDet.open = true;
      settingsDet.style.cssText = 'margin-top: 10px; border: 1px solid #1e293b; background: #080c16; border-radius: 8px; overflow: hidden;';

      const settingsSummary = document.createElement('summary');
      settingsSummary.style.cssText = 'padding: 8px 12px; font-family: var(--cp-font-mono); font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; cursor: pointer; user-select: none; background: #0f172a;';
      settingsSummary.textContent = '⚙️ Settings & Tools';
      settingsDet.appendChild(settingsSummary);

      const settingsBody = document.createElement('div');
      settingsBody.style.cssText = 'padding: 10px; display: flex; flex-direction: column; gap: 8px; font-family: var(--cp-font-sans); font-size: 11px;';

      const soundRow = document.createElement('label');
      soundRow.style.cssText = 'display: flex; justify-content: space-between; align-items: center; color: #cbd5e1; cursor: pointer;';
      const isSoundOn = localStorage.getItem('cp_sound_enabled') !== 'false';
      const soundChk = document.createElement('input');
      soundChk.type = 'checkbox';
      soundChk.checked = isSoundOn;
      soundChk.style.cssText = 'accent-color: #00f2fe; cursor: pointer;';
      soundChk.onchange = (e) => {
        localStorage.setItem('cp_sound_enabled', e.target.checked ? 'true' : 'false');
      };
      soundRow.append('Web Audio Haptics:', soundChk);
      settingsBody.appendChild(soundRow);

      const toolsGrid = document.createElement('div');
      toolsGrid.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 4px;';

      const makeToolBtn = (label, icon, color, onClick) => {
        const b = document.createElement('button');
        b.className = 'dr-nav-btn';
        b.style.cssText = `padding: 6px 8px; font-size: 10px; justify-content: center; color: ${color}; border-color: ${color}44; border-radius: 6px; font-family: monospace; font-weight: bold;`;
        b.innerHTML = `<span>${icon}</span> <span>${label}</span>`;
        b.onclick = onClick;
        return b;
      };

      toolsGrid.appendChild(makeToolBtn('Living Spec', '⚡', '#00f2fe', () => {
        const ItemNotes = globalThis.CommentsItemNotes || globalThis.CadPlanItemNotes;
        if (ItemNotes) ItemNotes.openPromptBuilderDialog(this.reader);
      }));

      toolsGrid.appendChild(makeToolBtn('Deploy Kit', '📦', '#38bdf8', () => {
        this.selectChapter('deployment_kit');
      }));

      toolsGrid.appendChild(makeToolBtn('Voice Notes', '🎙️', '#10b981', () => {
        const NotesMgr = globalThis.CommentsNotesManager || globalThis.CadPlanNotesManager;
        if (NotesMgr) NotesMgr.openDialog();
      }));

      toolsGrid.appendChild(makeToolBtn('In-Situ Edit', '✏️', '#c084fc', () => {
        const DocEd = globalThis.CommentsDocumentEditor || globalThis.CadPlanDocumentEditor;
        if (DocEd) DocEd.openRevisionManager(() => this.reader.renderCurrentDocument());
      }));

      settingsBody.appendChild(toolsGrid);
      settingsDet.appendChild(settingsBody);
      container.appendChild(settingsDet);
    }
  selectChapter(pageId) {
      this.activePageId = pageId;

      // 1. Invoke DocumentReader's switchPage method directly
      if (this.reader && typeof this.reader.switchPage === 'function') {
        this.reader.switchPage(pageId);
      }

      // 2. Refresh active highlight in SidePanel
      if (this.sidePanel) {
        this.sidePanel.contentContainer.querySelectorAll('.cp-chapter-card').forEach(card => {
          const isCur = card.dataset.pageId === pageId;
          card.classList.toggle('active', isCur);
          const list = card.querySelector('.cp-chapter-sections-list');
          if (list) list.style.display = isCur ? 'flex' : 'none';
          const chevron = card.querySelector('.cp-chapter-chevron');
          if (chevron) chevron.textContent = isCur ? '▼' : '▶';
        });
      }

      // 3. Smooth scroll main container to top
      if (this.rootElement) {
        this.rootElement.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  _setupHeaderToggleButton() {
      // Top bar header is cleanly configured inside DocumentReader._renderChrome
      return true;
  }
  destroy() {
      if (this._safeAreaHandler) {
        window.removeEventListener('layout-safe-area-change', this._safeAreaHandler);
        this._safeAreaHandler = null;
      }

      if (this.aardvark) {
        this.aardvark.destroy();
        this.aardvark = null;
      }

      if (this.sidePanel) {
        this.sidePanel.destroy();
        this.sidePanel = null;
      }

      if (this.reader && typeof this.reader.destroy === 'function') {
        try {
          this.reader.destroy();
        } catch (e) {}
        this.reader = null;
      }

      if (typeof UITools !== 'undefined' && typeof UITools.setSafeArea === 'function') {
        UITools.setSafeArea({ left: 0, right: 0, top: 0, bottom: 0 });
      }

      this.rootElement = null;
    }
}

globalThis.CommentsDocs = CommentsDocs;
window.CommentsDocs = CommentsDocs;
if (typeof module !== 'undefined' && module.exports) module.exports = CommentsDocs;