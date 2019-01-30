import { layout } from "@ember-decorators/component";
import MarkdownToHtml from 'ember-cli-showdown/components/markdown-to-html';

@layout('')
export default class MarkdownToSanitizedHtmlComponent extends MarkdownToHtml {}
