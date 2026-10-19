# 🚀 Authentic Comments Engine Invocation Analysis

Generated: 2026-10-19T06:06:16.557Z

## Directory Restructuring Summary
- **Core Client Engine:** `CommentsDocs/js/engine/` (11 files)
- **Legacy PHP Endpoints:** `CommentsDocs/legacy_php/` (6 files)
- **Legacy Test Harnesses:** `CommentsDocs/legacy_tests/` (10 files)

---

## Comments.js Constructor Analysis
```javascript
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
    this.realCommentThreshold = 3;
    this.hasResolvedInitia
```

---

## demo.html Invocation Pattern
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comments Integration Demo</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f0f2f5;
            color: #1c1e21;
            margin: 0;
            padding: 40px;
            line-height: 1.6;
        }
        .demo-container {
            max-width: 900px;
            margin: 0 auto;
        }
        header {
            margin-bottom: 40px;
            border-bottom: 2px solid #ddd;
            padding-bottom: 20px;
        }
        h1 { margin: 0; color: #111; }
        .subtitle { color: #555; font-size: 1.1em; margin-top: 10px; }
        
        section {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 
```

---

## SimpleTestPage.js Invocation Pattern
```javascript
class SimpleTestPage {
  constructor() {
    this.root = document.getElementById('simpletest-root');
    this.defaultBaseUrl = 'https://recursi.dev/commentsApi/simpletest.php';
    this.render();
  }

  render() {
    this.root.innerHTML = '';

    const title = this.make('h1', {}, 'Simple Cross-Origin PHP Probe');

    const note = this.make(
      'div',
      {
        style:
          'color:#a6b0c3; margin-bottom:16px; line-height:1.5;'
      },
      'This page does not touch the comments system. It only talks to simpletest.php and reads/writes a plain text file.'
    );

    const panel = this.make('div', {
      style:
        'background:#20242b; border:1px solid #3a4353; border-radius:12px; padding:16px; display:flex; flex-direction:column; gap:14px;'
    });

    const urlRow = this.make('div', {
      style: 'display:flex; align-items:center; gap:12px;'
    });
    urlRow.appendChild(this.make('label', { style: 'min-width:90px; color:#a6b0c3;' }
```

