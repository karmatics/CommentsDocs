# 🏛️ AUTHENTIC COMMENTS SPECIFICATION & INVARIANT DIRECTIVE

Generated: 2026-10-19T06:03:39.450Z
MANDATE: Retain 100% of authentic client-side behaviors, thread trees, and interaction mechanics.
Modernize ONLY the network transport (retiring DreamHost PHP in favor of Internet API).

---

## Comments.js (972 lines, 29086 bytes)

**Declared Methods (67):**
- `constructor()`
- `createPostBox(parentId, onPostCallback, onCancelCallback)`
- `if (this.currentUser)`
- `if (onCancelCallback)`
- `if (postResult.success)`
- `if (onCancelCallback)`
- `if (!displayName || displayName.length < 3)`
- `if (!userResult.success)`
- `if (postResult.success)`
- `setCurrentUser(user)`
- `if (this.onUserChange)`
- `if (this.toolbar)`
- `if (
      user &&
      oldUser &&
      oldUser.id === user.id &&
      oldUser.displayName !== user.displayName
    )`
- `if (user && !oldUser)`
- `if (!user)`
- `if (this.topLevelPostBoxContainer)`
- `if (postBox)`
- `if (header)`
- `if (this.currentUser)`
- `toggleDebugMode(e)`
- `toggleGlobalSortOrder(e)`
- `_showTopLevelPostButton()`
- `_showTopLevelPostBox()`
- `loadInitialData()`
- `if (userSession.success && userSession.user)`

## CommentNode.js (530 lines, 16238 bytes)

**Declared Methods (45):**
- `constructor(data, view, parent = null)`
- `render()`
- `if (this.isTemporary)`
- `if (this.isCollapsed)`
- `if (currentUser && this.userId === currentUser.id)`
- `if (this.children.length > 0)`
- `if (user && user.avatarUrl)`
- `if (user && !this.isDeleted)`
- `if (!this.isDeleted)`
- `if (!this.isDeleted)`
- `if (currentUser && this.userId === currentUser.id)`
- `showReplyBox()`
- `if (
      app.activeReplyController &&
      app.activeReplyController.nodeId === this.id
    )`
- `if (tempReplyNode.domElement)`
- `if (!this.isExpanded && this.children.length > 0)`
- `updateToggleIcon()`
- `updateStyle()`
- `toggleExpandCollapse(onComplete)`
- `if (this.children.length === 0)`
- `updateVisualState()`
- `getConnectionPoint()`
- `formatTimestamp()`
- `if (format === 'iso')`
- `if (format === 'full')`
- `if (diffDays < 7)`

## CommentThreadView.js (535 lines, 16380 bytes)

**Declared Methods (57):**
- `_createBaseStructure()`
- `setData(commentDataArray)`
- `if (!node.domElement)`
- `clear()`
- `if (this.animationFrameId)`
- `if (this.treeElement)`
- `_registerNodeAndChildren(node)`
- `_unregisterNode(node)`
- `calculateLayout()`
- `if (this.app && this.app.isDebugMode)`
- `if (node.domElement)`
- `if (visible)`
- `if (this.app && this.app.isDebugMode)`
- `if (currentY > this.options.verticalPadding)`
- `if (this.app && this.app.isDebugMode)`
- `_renderNodesFromLayout(layoutData, immediate = false)`
- `for (const nodeId in layoutData)`
- `if (!node.domElement)`
- `if (immediate)`
- `refreshLayout(onComplete)`
- `handleExpansionChange(nodeInstance, onComplete)`
- `if (this.isAnimating)`
- `_startAnimation(onCompleteCallback = null)`
- `if (this.isAnimating)`
- `_animationTick(timestamp)`

## CommentToolbar.js (122 lines, 3590 bytes)

**Declared Methods (6):**
- `constructor(app)`
- `render()`
- `updateUser()`
- `_renderUserContent()`
- `if (user)`
- `if (user.avatarUrl)`

## CommentStyles.js (1384 lines, 46797 bytes)

**Declared Methods (19):**
- `getAppContainerStyles()`
- `getCommentThreadStyles()`
- `getPostBoxStyles()`
- `getUserSwitcherStyles()`
- `getRatingPanelStyles()`
- `getDialogStyles()`
- `getToolbarStyles()`
- `applyAllStyles()`
- `_hexToRgba(hex, alpha)`
- `if (/^#([A-Fa-f0-9]3}){`
- `if (c.length == 3)`
- `getCommentNodeStyles()`
- `defaultSettings()`
- `getGlobalStyles()`
- `_mapSettingsToVariables(settings)`
- `updateTheme(settings)`
- `getDemoBannerStyles()`
- `media (max-width: 780px)`
- `ensureGoogleFontLoaded(fontFamily, href)`

## NameRenderer.js (86 lines, 2195 bytes)

**Declared Methods (6):**
- `static render(name)`
- `for (let i = 1; i < segments.length; i++)`
- `if (hueValue)`
- `if (textPart)`
- `static _getColorFromHue(hue, colors)`
- `static normalize(name)`

## RatingPanel.js (211 lines, 5693 bytes)

**Declared Methods (12):**
- `constructor(anchorElement, commentNode)`
- `_createDom()`
- `_createSlider(label, color)`
- `show()`
- `hide()`
- `if (this.element)`
- `_positionPanel()`
- `_handleClickOutside(event)`
- `if (this.anchorElement.closePanelCallback)`
- `submitRating()`
- `if (!app.currentUser)`
- `if (result.success)`

## ServerAPI.js (188 lines, 4768 bytes)

**Declared Methods (26):**
- `constructor(baseUrl = 'https://recursi.dev/commentsApi/api.php')`
- `setBaseUrl(baseUrl)`
- `if (baseUrl && typeof baseUrl === 'string')`
- `_fetch(action, options = }) {`
- `if (!fetchOptions.headers)`
- `if (hasBody)`
- `if (!response.ok)`
- `if (errorJson && errorJson.error)`
- `catch (e)`
- `catch (error)`
- `getThreadData(threadId = 'main')`
- `getOrCreateUser(displayName)`
- `postComment( parentId, userId, text, threadId = 'main' }) {`
- `getCurrentUser()`
- `updateUserDisplayName(displayName)`
- `clearAllData(threadId = null)`
- `deleteComment(commentId, userId, threadId = 'main')`
- `registerUser(email, password, displayName)`
- `loginUser(email, password)`
- `submitRating(payload)`
- `setPassword(email, password)`
- `adminGetThreadStats(threadId = 'main')`
- `adminDeleteComment(
    commentId,
    threadId = 'main',
    deletedBy = 'admin-debug'
  )`
- `adminAssumeUserSession(userId)`
- `adminGetThreads()`

## MockServerAPI.js (365 lines, 11064 bytes)

**Declared Methods (37):**
- `constructor()`
- `if (existingUser)`
- `if (normalized === 'rob' && !existingUser.avatarUrl)`
- `if (normalized === 'rob')`
- `_simulateNetworkDelay(resolveValue, delay = 300)`
- `_seedInitialData()`
- `if (!response.ok)`
- `if (comment.parentId)`
- `if (parent)`
- `catch (error)`
- `getThreadData(threadId = 'main')`
- `if (!this.db.threads[threadId])`
- `getOrCreateUser(displayName)`
- `catch (error)`
- `postComment( parentId, userId, text, threadId = 'main' }) {`
- `if (!userId || !text)`
- `if (!this.db.threads[threadId])`
- `if (parentId)`
- `for (const node of nodes)`
- `if (parent)`
- `rebuildAndSeed()`
- `getCurrentUser()`
- `updateUserDisplayName(displayName)`
- `if (!this.currentUser)`
- `if (newNormalized !== this.currentUser.normalizedName)`

## UserManager.js (123 lines, 3172 bytes)

**Declared Methods (14):**
- `constructor()`
- `_normalizeName(name)`
- `_validateName(name)`
- `getOrCreateUser(displayName)`
- `if (existingUser)`
- `getUserById(id)`
- `getAllUsers()`
- `isDuplicate(normalizedName)`
- `reset()`
- `loadUsers(usersArray)`
- `addUser(user)`
- `if (oldUser)`
- `if (oldUserGroup)`
- `if (index > -1)`

## UserAccountDialog.js (195 lines, 6557 bytes)

**Declared Methods (9):**
- `constructor(app)`
- `show()`
- `if (newNormalized !== currentUser.normalizedName)`
- `if (newName === currentUser.displayName)`
- `if (!email)`
- `if (pw.length < 8)`
- `if (pw !== pwConfirm)`
- `if (result.success)`
- `if (result.success)`

## CommentActions.php (203 lines, 6628 bytes)

**Declared Methods (12):**
- `handle_delete_comment()`
- `handle_get_thread_data()`
- `foreach ($raw_lines as $item)`
- `foreach ($deletions_map as $delId => $val)`
- `foreach ($comments_map as $id => $commentObj)`
- `prune_tree(&$nodes)`
- `array_filter($nodes, function($node)`
- `array_map(function($user)`
- `handle_post_comment()`
- `handle_admin_seed_comment()`
- `handle_submit_rating()`
- `_append_to_file($filePath, $record)`

## UserActions.php (359 lines, 13124 bytes)

**Declared Methods (28):**
- `handle_register_user()`
- `use ($email, $displayName, $normalized, $tokenHash, $passwordHash)`
- `foreach ($users as $user)`
- `foreach ($users as $user)`
- `handle_login_user()`
- `use ($email, $password, $tokenHash)`
- `foreach ($users as $index => $user)`
- `if ($matched_index === -1)`
- `handle_set_password()`
- `use ($tokenHash, $email, $newPasswordHash)`
- `foreach ($users as $index => $user)`
- `if ($current_index === -1)`
- `foreach ($users as $index => $user)`
- `handle_get_or_create_user()`
- `use ($displayName, $normalized, $tokenHash)`
- `foreach ($users as $index => $user)`
- `foreach ($users as $user)`
- `handle_get_current_user()`
- `foreach ($users as $user)`
- `foreach ($users as $user)`
- `handle_update_user_display_name()`
- `use ($tokenHash, $token, $new_display_name)`
- `foreach ($users as $index => $user)`
- `if ($current_index === -1)`
- `foreach ($users as $index => $user)`

## api.php (137 lines, 5068 bytes)

**Declared Methods (5):**
- `shutdown_crash_handler()`
- `is_allowed_origin($origin)`
- `apply_cors_headers()`
- `switch ($action)`
- `catch (Exception $e)`

