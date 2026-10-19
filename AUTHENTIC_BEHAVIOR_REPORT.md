# 📐 Authentic Comments Engine: Deep Behavioral Inventory

Generated: 2026-10-19T06:05:04.998Z
Verified: All 11 client modules have clean globalThis exports and are mounted in CommentsDocs.

---

### `Comments.js` (977 lines, 29248 bytes)
* **Definition:** `class Comments {`
* **Methods Found (55):** `constructor()`, `createPostBox(parentId, onPostCallback, onCancelCallback)`, `if (this.currentUser)`, `if (onCancelCallback)`, `if (postResult.success)`, `if (onCancelCallback)`, `if (!displayName || displayName.length < 3)`, `if (!userResult.success)`, `if (postResult.success)`, `setCurrentUser(user)`

### `CommentNode.js` (535 lines, 16409 bytes)
* **Definition:** `class CommentNode {`
* **Methods Found (41):** `constructor(data, view, parent = null)`, `render()`, `if (this.isTemporary)`, `if (this.isCollapsed)`, `if (currentUser && this.userId === currentUser.id)`, `if (this.children.length > 0)`, `if (user && user.avatarUrl)`, `if (user && !this.isDeleted)`, `if (!this.isDeleted)`, `if (currentUser && this.userId === currentUser.id)`

### `CommentThreadView.js` (540 lines, 16569 bytes)
* **Definition:** `class CommentThreadView {`
* **Methods Found (56):** `_createBaseStructure()`, `setData(commentDataArray)`, `if (!node.domElement)`, `clear()`, `if (this.animationFrameId)`, `if (this.treeElement)`, `_registerNodeAndChildren(node)`, `_unregisterNode(node)`, `calculateLayout()`, `if (this.app && this.app.isDebugMode)`

### `CommentToolbar.js` (127 lines, 3770 bytes)
* **Definition:** `class CommentToolbar {`
* **Methods Found (6):** `constructor(app)`, `render()`, `updateUser()`, `_renderUserContent()`, `if (user)`, `if (user.avatarUrl)`

### `CommentStyles.js` (1389 lines, 46974 bytes)
* **Definition:** `class CommentStyles {`
* **Methods Found (18):** `getAppContainerStyles()`, `getCommentThreadStyles()`, `getPostBoxStyles()`, `getUserSwitcherStyles()`, `getRatingPanelStyles()`, `getDialogStyles()`, `getToolbarStyles()`, `applyAllStyles()`, `_hexToRgba(hex, alpha)`, `if (/^#([A-Fa-f0-9]3}){1,2}$/.test(hex)) {`

### `NameRenderer.js` (91 lines, 2369 bytes)
* **Definition:** `class NameRenderer {`
* **Methods Found (6):** `static render(name)`, `for (let i = 1; i < segments.length; i++)`, `if (hueValue)`, `if (textPart)`, `static _getColorFromHue(hue, colors)`, `static normalize(name)`

### `RatingPanel.js` (216 lines, 5864 bytes)
* **Definition:** `class RatingPanel {`
* **Methods Found (11):** `constructor(anchorElement, commentNode)`, `_createDom()`, `_createSlider(label, color)`, `show()`, `hide()`, `if (this.element)`, `_positionPanel()`, `_handleClickOutside(event)`, `if (this.anchorElement.closePanelCallback)`, `if (!app.currentUser)`

### `UserManager.js` (128 lines, 3343 bytes)
* **Definition:** `class UserManager {`
* **Methods Found (14):** `constructor()`, `_normalizeName(name)`, `_validateName(name)`, `getOrCreateUser(displayName)`, `if (existingUser)`, `getUserById(id)`, `getAllUsers()`, `isDuplicate(normalizedName)`, `reset()`, `loadUsers(usersArray)`

### `UserAccountDialog.js` (200 lines, 6746 bytes)
* **Definition:** `class UserAccountDialog {`
* **Methods Found (8):** `constructor(app)`, `show()`, `if (newNormalized !== currentUser.normalizedName)`, `if (!email)`, `if (pw.length < 8)`, `if (pw !== pwConfirm)`, `if (result.success)`, `if (result.success)`

### `MockServerAPI.js` (370 lines, 11241 bytes)
* **Definition:** `class MockServerAPI {`
* **Methods Found (22):** `constructor()`, `if (existingUser)`, `if (normalized === 'rob' && !existingUser.avatarUrl)`, `if (normalized === 'rob')`, `_simulateNetworkDelay(resolveValue, delay = 300)`, `if (!response.ok)`, `if (comment.parentId)`, `if (parent)`, `if (!this.db.threads[threadId])`, `if (!userId || !text)`

### `ServerAPI.js` (193 lines, 4933 bytes)
* **Definition:** `class ServerAPI {`
* **Methods Found (7):** `constructor(baseUrl = 'https://recursi.dev/commentsApi/api.php')`, `setBaseUrl(baseUrl)`, `if (baseUrl && typeof baseUrl === 'string')`, `if (!fetchOptions.headers)`, `if (hasBody)`, `if (!response.ok)`, `if (errorJson && errorJson.error)`

### `CommentActions.php` (203 lines, 6628 bytes)
* **Definition:** `function handle_delete_comment() {`
* **Methods Found (3):** `foreach ($raw_lines as $item)`, `foreach ($deletions_map as $delId => $val)`, `foreach ($comments_map as $id => $commentObj)`

### `api.php` (137 lines, 5068 bytes)
* **Definition:** `function shutdown_crash_handler() {`
* **Methods Found (1):** `switch ($action)`

