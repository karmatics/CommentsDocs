# 🔬 Deep Architectural Audit: Legacy Comments Engine

Analyzed: 2026-10-19T06:01:33.639Z
Directory: `/Users/rob/source/LunoProjects/CommentsDocs/js/comments`

---

## `Comments.js` (29099 bytes, 972 lines)
* **Constructor Signature:** `constructor()`
* **Key Methods / Endpoints (18):**
  - `constructor()`
  - `createPostBox(parentId, onPostCallback, onCancelCallback)`
  - `setCurrentUser(user)`
  - `toggleDebugMode(e)`
  - `toggleGlobalSortOrder(e)`
  - `_showTopLevelPostButton()`
  - `_showTopLevelPostBox()`
  - `_updatePostBoxHeader(headerElement)`
  - `_updateAllUserDisplays(userId, newDisplayName)`
  - `closeAllPopups()`
  - `setActiveReplyController(controller)`
  - `applyTheme(themeSettings)`
  - `showAuthDialog()`
  - `renderDemoBanner()`
  - `updateDemoBanner()`

**Source Excerpt:**
```javascript

class Comments {
  constructor() {
    this.container = null;
    this.commentView = null;
    this.userManager = new UserManager();
    this.styles = new CommentStyles();

    this.serverAPI = new MockServerAPI();
    this.apiMode = 'mock';

    this.currentUser = null;
    this.appContainer = null;
    this.isDebugMode = false;
    this.globalSortOrder = 'newest';
    this.topLevelPostBoxContainer = null;
    this.userAccountDialog = new UserAccountDialog(this);
    this.activeReplyController = null;
    this.threadId = 'main';

    this.demoBannerWrapperElement = null;
    this.demoBannerElement = null;
    this.demoBannerTextElement = null;
    this.demoBannerToggleElement = null;
    this.demoBannerPopupOverlay = null;
...
```

---

## `CommentNode.js` (16238 bytes, 530 lines)
* **Constructor Signature:** `constructor(data, view, parent = null)`
* **Key Methods / Endpoints (15):**
  - `constructor(data, view, parent = null)`
  - `render()`
  - `showReplyBox()`
  - `updateToggleIcon()`
  - `updateStyle()`
  - `toggleExpandCollapse(onComplete)`
  - `updateVisualState()`
  - `getConnectionPoint()`
  - `toggleRatingPanel(buttonElement)`
  - `sortChildren()`
  - `toggleChildSortOrder()`
  - `renderTemporaryReplyBox()`
  - `removeChild(childId)`
  - `setCollapsed(isCollapsed)`
  - `updateTextPreview()`

**Source Excerpt:**
```javascript

class CommentNode {
  constructor(data, view, parent = null) {
    this.id = data.id;
    this.userId = data.userId;
    this.text = data.text;
    this.timestamp = data.timestamp ? new Date(data.timestamp) : new Date();
    this.isTemporary = data.isTemporary || false;
    this.isDeleted = data.isDeleted || false;
    this.isCollapsed = data.isCollapsed || false;

    this.children = (data.children || []).map(
      (childData) => new CommentNode(childData, view, this)
    );

    this.view = view;
    this.parent = parent;
    this.isExpanded = data.isExpanded !== undefined ? data.isExpanded : true;

    this.shortId = this.id.substring(this.id.length - 6).toUpperCase();
    this.indentLeveL = -1;

    this.domElement = null;
    this.contentElement = null;
    this.replyBoxContainer = null;
...
```

---

## `CommentThreadView.js` (16380 bytes, 535 lines)
* **Constructor Signature:** `constructor(container, options = {})`
* **Key Methods / Endpoints (24):**
  - `_createBaseStructure()`
  - `setData(commentDataArray)`
  - `clear()`
  - `_registerNodeAndChildren(node)`
  - `_unregisterNode(node)`
  - `calculateLayout()`
  - `_renderNodesFromLayout(layoutData, immediate = false)`
  - `refreshLayout(onComplete)`
  - `handleExpansionChange(nodeInstance, onComplete)`
  - `_startAnimation(onCompleteCallback = null)`
  - `_animationTick(timestamp)`
  - `_captureCurrentAnimationState()`
  - `_ensureNodesAreRenderedForAnimation()`
  - `_drawLinesInternal()`
  - `_drawLinesForNode(parentNode)`

**Source Excerpt:**
```javascript

class CommentThreadView {
  _createBaseStructure() {
    this.treeElement = makeElement('div', { className: 'comment-thread' });
    this.container.appendChild(this.treeElement);
    this.svgLayer = makeElement('svg:svg', {
      className: 'comment-thread-svg-layer',
    });
    // Prepend svg layer so comments are on top
    this.treeElement.insertBefore(this.svgLayer, this.treeElement.firstChild);
  }

  setData(commentDataArray) {
    this.clear();
    this.rootNodes = commentDataArray.map((data) => {
      const root = new CommentNode(data, this);
      this._registerNodeAndChildren(root);
      return root;
    });

    this.nodesMap.forEach((node) => {
      if (!node.domElement) {
        node.render();
        this.treeElement.appendChild(node.domElement);
        node.domElement.style.opacity = 0;
...
```

---

## `CommentToolbar.js` (3590 bytes, 122 lines)
* **Constructor Signature:** `constructor(app)`
* **Key Methods / Endpoints (4):**
  - `constructor(app)`
  - `render()`
  - `updateUser()`
  - `_renderUserContent()`

**Source Excerpt:**
```javascript

class CommentToolbar {
  constructor(app) {
    this.app = app;
    this.element = null;
    this.userContainer = null;
    this.sliderTrack = null;
  }

  render() {
    this.element = makeElement('div', { className: 'comment-toolbar' });

    // --- Left Section: Controls ---
    const controlsSection = makeElement('div', {
      className: 'toolbar-section controls',
    });

    // 1. Sort Toggle
    const sortBtn = makeElement('button', {
      className: 'toolbar-btn sort-btn',
      title: 'Toggle Sort Order (Newest/Oldest)',
    });
    sortBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 6h18M6 12h12M10 18h4" />
...
```

---

## `NameRenderer.js` (2195 bytes, 86 lines)
* **Key Methods / Endpoints (3):**
  - `static render(name)`
  - `static _getColorFromHue(hue, colors)`
  - `static normalize(name)`

**Source Excerpt:**
```javascript
class NameRenderer {
  /**
   * Renders a display name string into an HTML string with colored spans.
   * @param {string} name - The display name.
   * @returns {string} The resulting HTML.
   */
  static render(name) {
    if (!name) return '';

    const DEFAULT_COLOR = 'rgb(3, 174, 192)';
    const colors = [
      [255, 0, 0],
      [255, 125, 0],
      [239, 255, 0],
      [0, 235, 0],
      [0, 120, 255],
      [150, 50, 255],
      [255, 0, 255],
      [255, 0, 0],
    ];

    let html = '';
    let currentColor = DEFAULT_COLOR;
    const segments = name.split('@');

...
```

---

## `RatingPanel.js` (5693 bytes, 211 lines)
* **Constructor Signature:** `constructor(anchorElement, commentNode)`
* **Key Methods / Endpoints (7):**
  - `constructor(anchorElement, commentNode)`
  - `_createDom()`
  - `_createSlider(label, color)`
  - `show()`
  - `hide()`
  - `_positionPanel()`
  - `_handleClickOutside(event)`

**Source Excerpt:**
```javascript

class RatingPanel {
  constructor(anchorElement, commentNode) {
    this.anchorElement = anchorElement;
    this.commentNode = commentNode;
    this.element = null;
    this.feedbackTextarea = null;
    this.sliderValues = { Insightful: 50, Diplomatic: 50, 'Well-written': 50 };
    this._boundHandleClickOutside = this._handleClickOutside.bind(this);
    this._createDom();
    this.show();
  }

  _createDom() {
    this.element = makeElement('div', { className: 'rating-panel' });

    const slidersContainer = makeElement('div', {
      className: 'sliders-container',
    });
    slidersContainer.appendChild(this._createSlider('Insightful', '#3498db')); // Blue
    slidersContainer.appendChild(this._createSlider('Diplomatic', '#2ecc71')); // Green
    slidersContainer.appendChild(this._createSlider('Well-written', '#e67e22')); // Orange

    const feedbackHeader = makeElement(
      'div',
...
```

---

## `ServerAPI.js` (4768 bytes, 188 lines)
* **Constructor Signature:** `constructor(baseUrl = 'https://recursi.dev/commentsApi/api.php')`
* **Key Methods / Endpoints (2):**
  - `constructor(baseUrl = 'https://recursi.dev/commentsApi/api.php')`
  - `setBaseUrl(baseUrl)`

**Source Excerpt:**
```javascript
class ServerAPI {
  constructor(baseUrl = 'https://recursi.dev/commentsApi/api.php') {
    this.baseUrl = baseUrl;
  }

  setBaseUrl(baseUrl) {
    if (baseUrl && typeof baseUrl === 'string') {
      this.baseUrl = baseUrl;
    }
  }

  async _fetch(action, options = {}) {
    const defaultOptions = {
      method: 'GET',
    };
    const fetchOptions = { ...defaultOptions, ...options };
    const hasBody =
      fetchOptions.body !== undefined && fetchOptions.body !== null;

    let url = `${this.baseUrl}?action=${action}`;

    if (!fetchOptions.headers) {
      fetchOptions.headers = {};
    } else {
      fetchOptions.headers = { ...fetchOptions.headers };
...
```

---

## `MockServerAPI.js` (11064 bytes, 365 lines)
* **Constructor Signature:** `constructor()`
* **Key Methods / Endpoints (2):**
  - `constructor()`
  - `_simulateNetworkDelay(resolveValue, delay = 300)`

**Source Excerpt:**
```javascript
class MockServerAPI {
  constructor() {
    this.db = { users: [], threads: { main: [] } }; // Changed comments to threads map
    this.currentUser = null;

    this.serverUserManager = {
      usersByNormalizedName: new Map(),
      usersById: new Map(),
      _normalizeName: (name) =>
        (name || '')
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, ''),
      getOrCreateUser: (displayName) => {
        if (!displayName || !displayName.trim()) {
          throw new Error('Invalid username. Name cannot be empty.');
        }
        const normalized = this.serverUserManager._normalizeName(displayName);
        const existingUsers =
          this.serverUserManager.usersByNormalizedName.get(normalized) || [];

        const existingUser = existingUsers.find(
          (u) => u.displayName === displayName
        );

...
```

---

## `UserManager.js` (3172 bytes, 123 lines)
* **Constructor Signature:** `constructor()`
* **Key Methods / Endpoints (10):**
  - `constructor()`
  - `_normalizeName(name)`
  - `_validateName(name)`
  - `getOrCreateUser(displayName)`
  - `getUserById(id)`
  - `getAllUsers()`
  - `isDuplicate(normalizedName)`
  - `reset()`
  - `loadUsers(usersArray)`
  - `addUser(user)`

**Source Excerpt:**
```javascript
class UserManager {
  constructor() {
    this.reset();
  }

  /**
   * Loads a fresh set of users from the server, replacing any existing data.
   * @param {Array<Object>} usersArray - The array of user objects from the API.
   */

  _normalizeName(name) {
    if (!name) return '';
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  _validateName(name) {
    // Letters only, at least 3 characters.
    return /^[a-zA-Z]{3,}$/.test(name);
  }

  getOrCreateUser(displayName) {
    if (!displayName || !this._validateName(displayName)) {
...
```

---

## `UserAccountDialog.js` (6557 bytes, 195 lines)
* **Constructor Signature:** `constructor(app)`
* **Key Methods / Endpoints (2):**
  - `constructor(app)`
  - `show()`

**Source Excerpt:**
```javascript

class UserAccountDialog {
  constructor(app) {
    this.app = app;
    this.dialog = null;
  }

  show() {
    const currentUser = this.app.currentUser;
    if (!currentUser) return;

    this.app.closeAllPopups();

    const content = makeElement('div', { className: 'user-account-dialog' });

    // --- DISPLAY NAME SECTION ---
    content.appendChild(makeElement('h3', {}, 'Edit Your Display Name'));
    content.appendChild(
      makeElement(
        'p',
        { className: 'info-text' },
        'You can change the capitalization or add color codes (e.g., "N@2ame") without changing your underlying unique name.'
      )
    );

...
```

---

## `CommentActions.php` (6628 bytes, 203 lines)
* **Key Methods / Endpoints (7):**
  - `function handle_delete_comment()`
  - `function handle_get_thread_data()`
  - `function prune_tree(&$nodes)`
  - `function handle_post_comment()`
  - `function handle_admin_seed_comment()`
  - `function handle_submit_rating()`
  - `function _append_to_file($filePath, $record)`

**Source Excerpt:**
```php
<?php
// --- COMMENT-RELATED ACTION HANDLERS ---

function handle_delete_comment() {
    log_to_file("Executing: handle_delete_comment");
    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['targetId']) || !isset($input['userId'])) {
        send_json_error('Missing targetId or userId.');
    }

    $threadId = $input['threadId'] ?? 'main';
    $commentsFilePath = get_comments_file_path($threadId);

    $tombstone = [
        'type' => 'delete',
        'targetId' => $input['targetId'],
        'deletedBy' => $input['userId'],
        'timestamp' => date('c')
    ];

    _append_to_file($commentsFilePath, $tombstone);
    echo json_encode(['success' => true]);
}

...
```

---

## `UserActions.php` (13126 bytes, 359 lines)
* **Key Methods / Endpoints (8):**
  - `function handle_register_user()`
  - `function handle_login_user()`
  - `function handle_set_password()`
  - `function handle_get_or_create_user()`
  - `function handle_get_current_user()`
  - `function handle_update_user_display_name()`
  - `function _set_session_cookie($rawToken)`
  - `function _add_public_user_data(&$user)`

**Source Excerpt:**
```php
<?php
// --- USER-RELATED ACTION HANDLERS ---

function handle_register_user() {
    log_to_file("Executing: handle_register_user");
    
    if (!check_rate_limit('register', 5, 3600)) {
        send_json_error('Too many registration attempts. Please try again later.', 429);
    }
    
    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['email']) || !isset($input['password'])) {
        send_json_error('Email and password are required.');
    }

    $email = strtolower(trim($input['email']));
    $password = trim($input['password']);
    $displayName = isset($input['displayName']) ? strip_tags(trim($input['displayName'])) : '';

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        send_json_error('Invalid email address.');
    }
    if (strlen($password) < 8) {
        send_json_error('Password must be at least 8 characters.');
...
```

---

## `api.php` (5068 bytes, 137 lines)
* **Key Methods / Endpoints (3):**
  - `function shutdown_crash_handler()`
  - `function is_allowed_origin($origin)`
  - `function apply_cors_headers()`

**Source Excerpt:**
```php
<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);

function shutdown_crash_handler() {
    $error = error_get_last();
    if ($error && ($error['type'] === E_ERROR || $error['type'] === E_PARSE || $error['type'] === E_COMPILE_ERROR || $error['type'] === E_CORE_ERROR)) {
        if (ob_get_length()) ob_clean();

        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode([
            'success' => false,
            'error' => "FATAL PHP ERROR: " . $error['message'],
            'file' => $error['file'],
            'line' => $error['line']
        ]);
        exit;
    }
}
register_shutdown_function('shutdown_crash_handler');

ob_start();

header('Content-Type: application/json; charset=utf-8');
...
```

---

