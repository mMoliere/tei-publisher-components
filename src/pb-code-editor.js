import { LitElement, html, css } from 'lit-element'
import '@polymer/iron-ajax/iron-ajax.js';
import CodeMirror from 'codemirror/src/codemirror.js';

import modeXquery from "../assets/codemirror/mode/xquery/xquery.js";
import modeCss from "../assets/codemirror/mode/css/css.js";
import addonDisplayPlaceholder from "../assets/codemirror/addon/display/placeholder.js";
import addonEditMatchBracket from "../assets/codemirror/addon/edit/matchbrackets.js";
import addonLint from "../assets/codemirror/addon/lint/lint.js";

import { get as i18n, translate } from "./pb-i18n.js";

modeXquery(CodeMirror);
modeCss(CodeMirror);
addonDisplayPlaceholder(CodeMirror);
addonEditMatchBracket(CodeMirror);
addonLint(CodeMirror);

/**
 * A wrapper for the popular codemirror code editor.
 *
 *
 * @customElement
 * @demo demo/pb-code-editor.html
 */
export class PbCodeEditor extends LitElement {

    static get styles() {
        return css`
            :host {
                display: block;
                width: 100%;
                margin: 0;
                position: relative;
                color:inherit;
            }

            #editorDiv, .CodeMirror {
              width: 100%;
              height: auto;
              position: relative;
              top:0;
              left:0;
            }

            .label {
                color:var(--paper-grey-500);
                margin-bottom:5px;
            }


            /* BASICS */

            .CodeMirror {
                /* Set height, width, borders, and global font properties here */
                font-family: monospace;
                height: auto;
                color: black;
                direction: ltr;
            }

            /* PADDING */

            .CodeMirror-lines {
                padding: 4px 0; /* Vertical padding around content */
            }
            .CodeMirror pre {
                padding: 0 4px; /* Horizontal padding of content */
            }

            .CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {
                background-color: white; /* The little square between H and V scrollbars */
            }

            /* GUTTER */

            .CodeMirror-gutters {
                border-right: 1px solid #ddd;
                background-color: #f7f7f7;
                white-space: nowrap;
            }
            .CodeMirror-linenumbers {}
            .CodeMirror-linenumber {
                padding: 0 3px 0 5px;
                min-width: 20px;
                text-align: right;
                color: #999;
                white-space: nowrap;
            }

            .CodeMirror-guttermarker { color: black; }
            .CodeMirror-guttermarker-subtle { color: #999; }

            /* CURSOR */

            .CodeMirror-cursor {
                border-left: 1px solid black;
                border-right: none;
                width: 0;
            }
            /* Shown when moving in bi-directional text */
            .CodeMirror div.CodeMirror-secondarycursor {
                border-left: 1px solid silver;
            }
            .cm-fat-cursor .CodeMirror-cursor {
                width: auto;
                border: 0 !important;
                background: #7e7;
            }
            .cm-fat-cursor div.CodeMirror-cursors {
                z-index: 1;
            }
            .cm-fat-cursor-mark {
                background-color: rgba(20, 255, 20, 0.5);
                -webkit-animation: blink 1.06s steps(1) infinite;
                -moz-animation: blink 1.06s steps(1) infinite;
                animation: blink 1.06s steps(1) infinite;
            }
            .cm-animate-fat-cursor {
                width: auto;
                border: 0;
                -webkit-animation: blink 1.06s steps(1) infinite;
                -moz-animation: blink 1.06s steps(1) infinite;
                animation: blink 1.06s steps(1) infinite;
                background-color: #7e7;
            }
            @-moz-keyframes blink {
                0% {}
                50% { background-color: transparent; }
                100% {}
            }
            @-webkit-keyframes blink {
                0% {}
                50% { background-color: transparent; }
                100% {}
            }
            @keyframes blink {
                0% {}
                50% { background-color: transparent; }
                100% {}
            }

            /* Can style cursor different in overwrite (non-insert) mode */
            .CodeMirror-overwrite .CodeMirror-cursor {}

            .cm-tab { display: inline-block; text-decoration: inherit; }

            .CodeMirror-rulers {
                position: absolute;
                left: 0; right: 0; top: -50px; bottom: -20px;
                overflow: hidden;
            }
            .CodeMirror-ruler {
                border-left: 1px solid #ccc;
                top: 0; bottom: 0;
                position: absolute;
            }

            /* DEFAULT THEME */

            .cm-s-default .cm-header {color: blue;}
            .cm-s-default .cm-quote {color: #090;}
            .cm-negative {color: #d44;}
            .cm-positive {color: #292;}
            .cm-header, .cm-strong {font-weight: bold;}
            .cm-em {font-style: italic;}
            .cm-link {text-decoration: underline;}
            .cm-strikethrough {text-decoration: line-through;}

            .cm-s-default .cm-keyword {color: #708;}
            .cm-s-default .cm-atom {color: #219;}
            .cm-s-default .cm-number {color: #164;}
            .cm-s-default .cm-def {color: #00f;}
            .cm-s-default .cm-variable,
            .cm-s-default .cm-punctuation,
            .cm-s-default .cm-property,
            .cm-s-default .cm-operator {}
            .cm-s-default .cm-variable-2 {color: #05a;}
            .cm-s-default .cm-variable-3, .cm-s-default .cm-type {color: #085;}
            .cm-s-default .cm-comment {color: #a50;}
            .cm-s-default .cm-string {color: #a11;}
            .cm-s-default .cm-string-2 {color: #f50;}
            .cm-s-default .cm-meta {color: #555;}
            .cm-s-default .cm-qualifier {color: #555;}
            .cm-s-default .cm-builtin {color: #30a;}
            .cm-s-default .cm-bracket {color: #997;}
            .cm-s-default .cm-tag {color: #170;}
            .cm-s-default .cm-attribute {color: #00c;}
            .cm-s-default .cm-hr {color: #999;}
            .cm-s-default .cm-link {color: #00c;}

            .cm-s-default .cm-error {color: #f00;}
            .cm-invalidchar {color: #f00;}

            .CodeMirror-composing { border-bottom: 2px solid; }

            /* Default styles for common addons */

            div.CodeMirror span.CodeMirror-matchingbracket {color: #0f0;}
            div.CodeMirror span.CodeMirror-nonmatchingbracket {color: #f22;}
            .CodeMirror-matchingtag { background: rgba(255, 150, 0, .3); }
            .CodeMirror-activeline-background {background: #e8f2ff;}

            /* STOP */

            /* The rest of this file contains styles related to the mechanics of
               the editor. You probably shouldn't touch them. */

            .CodeMirror {
                position: relative;
                overflow: hidden;
                background: white;
            }

            .CodeMirror-scroll {
                overflow: scroll !important; /* Things will break if this is overridden */
                /* 30px is the magic margin used to hide the element's real scrollbars */
                /* See overflow: hidden in .CodeMirror */
                margin-bottom: -30px; margin-right: -30px;
                padding-bottom: 30px;
                outline: none; /* Prevent dragging from highlighting the element */
                position: relative;
            }
            .CodeMirror-sizer {
                position: relative;
                border-right: 30px solid transparent;
            }


            /* The fake, visible scrollbars. Used to force redraw during scrolling
               before actual scrolling happens, thus preventing shaking and
               flickering artifacts. */
            .CodeMirror-vscrollbar, .CodeMirror-hscrollbar, .CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {
                position: absolute;
                z-index: 6;
                display: none;
            }
            .CodeMirror-vscrollbar {
                right: 0; top: 0;
                overflow-x: hidden;
                overflow-y: scroll;
            }
            .CodeMirror-hscrollbar {
                bottom: 0; left: 0;
                overflow-y: hidden;
                overflow-x: scroll;
            }
            .CodeMirror-scrollbar-filler {
                right: 0; bottom: 0;
            }
            .CodeMirror-gutter-filler {
                left: 0; bottom: 0;
            }

            .CodeMirror-gutters {
                position: absolute; left: 0; top: 0;
                z-index: 3;
            }
            .CodeMirror-gutter {
                white-space: normal;
                display: inline-block;
                vertical-align: top;
                margin-bottom: -30px;
            }
            .CodeMirror-gutter-wrapper {
                position: absolute;
                z-index: 4;
                background: none !important;
                border: none !important;
            }
            .CodeMirror-gutter-background {
                position: absolute;
                top: 0; bottom: 0;
                z-index: 4;
            }
            .CodeMirror-gutter-elt {
                position: absolute;
                cursor: default;
                z-index: 4;
            }
            .CodeMirror-gutter-wrapper ::selection { background-color: transparent }
            .CodeMirror-gutter-wrapper ::-moz-selection { background-color: transparent }

            .CodeMirror-lines {
                cursor: text;
                min-height: 1px; /* prevents collapsing before first draw */
            }
            .CodeMirror pre {
                /* Reset some styles that the rest of the page might have set */
                -moz-border-radius: 0; -webkit-border-radius: 0; border-radius: 0;
                border-width: 0;
                background: transparent;
                font-family: inherit;
                font-size: inherit;
                margin: 0;
                white-space: pre;
                word-wrap: normal;
                line-height: inherit;
                color: inherit;
                z-index: 2;
                position: relative;
                overflow: visible;
                -webkit-tap-highlight-color: transparent;
                -webkit-font-variant-ligatures: contextual;
                font-variant-ligatures: contextual;
            }
            .CodeMirror-wrap pre {
                word-wrap: break-word;
                white-space: pre-wrap;
                word-break: normal;
            }

            .CodeMirror-linebackground {
                position: absolute;
                left: 0; right: 0; top: 0; bottom: 0;
                z-index: 0;
            }

            .CodeMirror-linewidget {
                position: relative;
                z-index: 2;
                overflow: auto;
            }

            .CodeMirror-widget {}

            .CodeMirror-rtl pre { direction: rtl; }

            .CodeMirror-code {
                outline: none;
            }

            /* Force content-box sizing for the elements where we expect it */
            .CodeMirror-scroll,
            .CodeMirror-sizer,
            .CodeMirror-gutter,
            .CodeMirror-gutters,
            .CodeMirror-linenumber {
                -moz-box-sizing: content-box;
                box-sizing: content-box;
            }

            .CodeMirror-measure {
                position: absolute;
                width: 100%;
                height: 0;
                overflow: hidden;
                visibility: hidden;
            }

            .CodeMirror-cursor {
                position: absolute;
                pointer-events: none;
            }
            .CodeMirror-measure pre { position: static; }

            div.CodeMirror-cursors {
                visibility: hidden;
                position: relative;
                z-index: 3;
            }
            div.CodeMirror-dragcursors {
                visibility: visible;
            }

            .CodeMirror-focused div.CodeMirror-cursors {
                visibility: visible;
            }

            .CodeMirror-selected { background: #d9d9d9; }
            .CodeMirror-focused .CodeMirror-selected { background: #d7d4f0; }
            .CodeMirror-crosshair { cursor: crosshair; }
            .CodeMirror-line::selection, .CodeMirror-line > span::selection, .CodeMirror-line > span > span::selection { background: #d7d4f0; }
            .CodeMirror-line::-moz-selection, .CodeMirror-line > span::-moz-selection, .CodeMirror-line > span > span::-moz-selection { background: #d7d4f0; }

            .cm-searching {
                background-color: #ffa;
                background-color: rgba(255, 255, 0, .4);
            }

            /* Used to force a border model for a node */
            .cm-force-border { padding-right: .1px; }

            @media print {
                /* Hide the cursor when printing */
                .CodeMirror div.CodeMirror-cursors {
                    visibility: hidden;
                }
            }

            /* See issue #2901 */
            .cm-tab-wrap-hack:after { content: ''; }

            /* Help users use markselection to safely style text background */
            span.CodeMirror-selectedtext { background: none; }


            /* ttcn */

            .cm-s-ttcn .cm-quote { color: #090; }
            .cm-s-ttcn .cm-negative { color: #d44; }
            .cm-s-ttcn .cm-positive { color: #292; }
            .cm-s-ttcn .cm-header, .cm-strong { font-weight: bold; }
            .cm-s-ttcn .cm-em { font-style: italic; }
            .cm-s-ttcn .cm-link { text-decoration: underline; }
            .cm-s-ttcn .cm-strikethrough { text-decoration: line-through; }
            .cm-s-ttcn .cm-header { color: #00f; font-weight: bold; }

            .cm-s-ttcn .cm-atom { color: #219; }
            .cm-s-ttcn .cm-attribute { color: #00c; }
            .cm-s-ttcn .cm-bracket { color: #997; }
            .cm-s-ttcn .cm-comment { color: #333333; }
            .cm-s-ttcn .cm-def { color: #00f; }
            .cm-s-ttcn .cm-em { font-style: italic; }
            .cm-s-ttcn .cm-error { color: #f00; }
            .cm-s-ttcn .cm-hr { color: #999; }
            .cm-s-ttcn .cm-invalidchar { color: #f00; }
            .cm-s-ttcn .cm-keyword { font-weight:bold; }
            .cm-s-ttcn .cm-link { color: #00c; text-decoration: underline; }
            .cm-s-ttcn .cm-meta { color: #555; }
            .cm-s-ttcn .cm-negative { color: #d44; }
            .cm-s-ttcn .cm-positive { color: #292; }
            .cm-s-ttcn .cm-qualifier { color: #555; }
            .cm-s-ttcn .cm-strikethrough { text-decoration: line-through; }
            .cm-s-ttcn .cm-string { color: #006400; }
            .cm-s-ttcn .cm-string-2 { color: #f50; }
            .cm-s-ttcn .cm-strong { font-weight: bold; }
            .cm-s-ttcn .cm-tag { color: #170; }
            .cm-s-ttcn .cm-variable { color: #8B2252; }
            .cm-s-ttcn .cm-variable-2 { color: #05a; }
            .cm-s-ttcn .cm-variable-3, .cm-s-ttcn .cm-type { color: #085; }

            .cm-s-ttcn .cm-invalidchar { color: #f00; }

            /* ASN */
            .cm-s-ttcn .cm-accessTypes,
            .cm-s-ttcn .cm-compareTypes { color: #27408B; }
            .cm-s-ttcn .cm-cmipVerbs { color: #8B2252; }
            .cm-s-ttcn .cm-modifier { color:#D2691E; }
            .cm-s-ttcn .cm-status { color:#8B4545; }
            .cm-s-ttcn .cm-storage { color:#A020F0; }
            .cm-s-ttcn .cm-tags { color:#006400; }

            /* CFG */
            .cm-s-ttcn .cm-externalCommands { color: #8B4545; font-weight:bold; }
            .cm-s-ttcn .cm-fileNCtrlMaskOptions,
            .cm-s-ttcn .cm-sectionTitle { color: #2E8B57; font-weight:bold; }

            /* TTCN */
            .cm-s-ttcn .cm-booleanConsts,
            .cm-s-ttcn .cm-otherConsts,
            .cm-s-ttcn .cm-verdictConsts { color: #006400; }
            .cm-s-ttcn .cm-configOps,
            .cm-s-ttcn .cm-functionOps,
            .cm-s-ttcn .cm-portOps,
            .cm-s-ttcn .cm-sutOps,
            .cm-s-ttcn .cm-timerOps,
            .cm-s-ttcn .cm-verdictOps { color: #0000FF; }
            .cm-s-ttcn .cm-preprocessor,
            .cm-s-ttcn .cm-templateMatch,
            .cm-s-ttcn .cm-ttcn3Macros { color: #27408B; }
            .cm-s-ttcn .cm-types { color: #A52A2A; font-weight:bold; }
            .cm-s-ttcn .cm-visibilityModifiers { font-weight:bold; }

            /* lint */

            /* The lint marker gutter */
            .CodeMirror-lint-markers {
                width: 16px;
            }

            .CodeMirror-lint-tooltip {
                background-color: #ffd;
                border: 1px solid black;
                border-radius: 4px 4px 4px 4px;
                color: black;
                font-family: monospace;
                font-size: 10pt;
                overflow: hidden;
                padding: 2px 5px;
                position: fixed;
                white-space: pre;
                white-space: pre-wrap;
                z-index: 100;
                max-width: 600px;
                opacity: 0;
                transition: opacity .4s;
                -moz-transition: opacity .4s;
                -webkit-transition: opacity .4s;
                -o-transition: opacity .4s;
                -ms-transition: opacity .4s;
            }

            .CodeMirror-lint-mark-error, .CodeMirror-lint-mark-warning {
                background-position: left bottom;
                background-repeat: repeat-x;
            }

            .CodeMirror-lint-mark-error {
                background-image:
                        url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJDw4cOCW1/KIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAHElEQVQI12NggIL/DAz/GdA5/xkY/qPKMDAwAADLZwf5rvm+LQAAAABJRU5ErkJggg==")
            ;
            }

            .CodeMirror-lint-mark-warning {
                background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJFhQXEbhTg7YAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAMklEQVQI12NkgIIvJ3QXMjAwdDN+OaEbysDA4MPAwNDNwMCwiOHLCd1zX07o6kBVGQEAKBANtobskNMAAAAASUVORK5CYII=");
            }

            .CodeMirror-lint-marker-error, .CodeMirror-lint-marker-warning {
                background-position: center center;
                background-repeat: no-repeat;
                cursor: pointer;
                display: inline-block;
                height: 16px;
                width: 16px;
                vertical-align: middle;
                position: relative;
            }

            .CodeMirror-lint-message-error, .CodeMirror-lint-message-warning {
                padding-left: 18px;
                background-position: top left;
                background-repeat: no-repeat;
            }

            .CodeMirror-lint-marker-error, .CodeMirror-lint-message-error {
                background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAHlBMVEW7AAC7AACxAAC7AAC7AAAAAAC4AAC5AAD///+7AAAUdclpAAAABnRSTlMXnORSiwCK0ZKSAAAATUlEQVR42mWPOQ7AQAgDuQLx/z8csYRmPRIFIwRGnosRrpamvkKi0FTIiMASR3hhKW+hAN6/tIWhu9PDWiTGNEkTtIOucA5Oyr9ckPgAWm0GPBog6v4AAAAASUVORK5CYII=");
            }

            .CodeMirror-lint-marker-warning, .CodeMirror-lint-message-warning {
                background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAANlBMVEX/uwDvrwD/uwD/uwD/uwD/uwD/uwD/uwD/uwD6twD/uwAAAADurwD2tQD7uAD+ugAAAAD/uwDhmeTRAAAADHRSTlMJ8mN1EYcbmiixgACm7WbuAAAAVklEQVR42n3PUQqAIBBFUU1LLc3u/jdbOJoW1P08DA9Gba8+YWJ6gNJoNYIBzAA2chBth5kLmG9YUoG0NHAUwFXwO9LuBQL1giCQb8gC9Oro2vp5rncCIY8L8uEx5ZkAAAAASUVORK5CYII=");
            }

            .CodeMirror-lint-marker-multiple {
                background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAMAAADzjKfhAAAACVBMVEUAAAAAAAC/v7914kyHAAAAAXRSTlMAQObYZgAAACNJREFUeNo1ioEJAAAIwmz/H90iFFSGJgFMe3gaLZ0od+9/AQZ0ADosbYraAAAAAElFTkSuQmCC");
                background-repeat: no-repeat;
                background-position: right bottom;
                width: 100%; height: 100%;
            }

        `;
    }

    static get properties() {
        return {
            /**
             * reference to actual CodeMirror object
             */
            _editor: {
                type: Object
            },
            /**
             * the code as a string
             */
            code: {
                type: String,
                reflect: true
            },
            /**
             * the language mode e.g. 'javascript' or 'xquery'.
             */
            mode: {
                type: String
            },
            /**
             * placeholder if code is empty
             */
            placeholder: {
                type: String
            },
            /**
             * tab indent size
             */
            tabSize: {
                type: Number
            },
            /**
             * label for the editor
             */
            label: {
                type: String
            },
            linter: {
                attribute: true
            }
        };
    }

    constructor() {
        super();
        this.code = '';
        this.mode = 'javascript';
        this.placeholder = i18n('odd.editor.model.empty');
        this.tabSize = 2;
        this.label = '';
        this.linter = '';
    }

    render() {
        return html`
            <iron-ajax id="lint" url="${this.linter}"
               handle-as="json" content-type="application/x-www-form-urlencoded"
               method="POST"
               @error="${this._handleLintError}"></iron-ajax>

            <div class="label">${this.label}</div>
            <div id="editorDiv" code="$(this.code)"></div>
        `;
    }

    attributeChangedCallback(name, old, value) {
        super.attributeChangedCallback(name, old, value);
        if (name === 'code') {
            this.setSource(value);
            this.code = value;
            this.requestUpdate();
        }
    }

    async firstUpdated() {
        await this.updateComplete;
        // if (this.code) {
        //     const {code} = this;
        //     this.code = code.trim();
        // }
        this._initEditor();
    }

    _initEditor() {
        const editorDiv = this.shadowRoot.getElementById('editorDiv')
        const cm = CodeMirror(editorDiv, {
            value: this.code || '',
            mode: this.mode,
            lineNumbers: true,
            lineWrapping: true,
            autofocus: false,
            theme: "ttcn",
            matchBrackets: true,
            placeholder: this.placeholder,
            gutters: ["CodeMirror-lint-markers"],
            lint: true,
            viewportMargin: Infinity
        });

        cm.on('change', () => this.setCode(cm.getValue()));

        this._editor = cm;
        if (this.mode === 'xquery' && this.linter !== '') {
            CodeMirror.registerHelper("lint", "xquery", this.lintXQuery.bind(this));
        }
    }

    /**
     * XQuery linting.
     *
     * calls server-side service for XQuery linting. Will return an array of linting errors or an empty array
     * if code is fine.
     *
     * @param {String} text
     * @returns {Array|Promise}
     */
    lintXQuery(text) {
        if (!text) {
            return [];
        }

        const ajax = this.shadowRoot.getElementById('lint');

        return new Promise((resolve) => {
            const params = {
                action: "lint",
                code: text
            };

            ajax.params = null;
            ajax.body = params;

            const request = ajax.generateRequest();
            request.completes.then((req) => {
                const data = req.response;
                if (data.status === 'fail') {
                    resolve([{
                        message: data.message,
                        severity: "error",
                        from: CodeMirror.Pos(data.line - 1, data.column),
                        to: CodeMirror.Pos(data.line - 1, data.column + 3)
                    }]);
                }
                else {
                    resolve([]);
                }
            });

        });
    }


    /**
     *
     * @returns {String} the sourcecode
     */
    getSource() {
        if (!this._editor) {
            return '';
        }
        return this._editor.getValue();
    }

    /**
     * pass code to editor for editing/display.
     *
     * @param {String} newval
     */
    setSource(newval) {
        if (!this._editor || newval === this._editor.getValue()) {
            return;
        }
        const val = newval || ''
        this._editor.setValue(val);
        this._editor.refresh();
    }

    /**
     * call refresh() to update the view after external changes have occured. Might be needed after dynamic
     * changes of the UI.
     */
    refresh() {
        if (!this._editor) return;
        this._editor.refresh();
    }

    setCode(value) {
        this.code = value
        this.dispatchEvent(new CustomEvent('code-changed', { composed: true, bubbles: true, detail: { code: this.code } }));
    }

    _handleLintError(e) {
        console.error('error while linting: ', e.detail);

        const error = e.detail.error.message;
        if (error.includes('404')) {
            const url = this.shadowRoot.getElementById('lint').url;
            this.dispatchEvent(new CustomEvent('linting-error', { composed: true, bubbles: true, detail: { error: 'linting service unavailable', url: url } }));
        } else {
            this.dispatchEvent(new CustomEvent('linting-error', { composed: true, bubbles: true, detail: { error: error } }));
        }


    }
}

customElements.define('pb-code-editor', PbCodeEditor);
