/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import AutoImage from '@ckeditor/ckeditor5-image/src/autoimage.js';
import AutoLink from '@ckeditor/ckeditor5-link/src/autolink.js';
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport.js';
import HtmlComment from '@ckeditor/ckeditor5-html-support/src/htmlcomment.js';
import HtmlEmbed from '@ckeditor/ckeditor5-html-embed/src/htmlembed.js';
import Image from '@ckeditor/ckeditor5-image/src/image.js';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert.js';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed.js';
import MediaEmbedToolbar from '@ckeditor/ckeditor5-media-embed/src/mediaembedtoolbar.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import SimpleGrid from './plugins/simple-grid/src/simplegrid.js';
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation.js';

class Editor extends ClassicEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
	Alignment,
	AutoImage,
	AutoLink,
	Base64UploadAdapter,
	Bold,
	Essentials,
	Heading,
	GeneralHtmlSupport,
	HtmlComment,
	HtmlEmbed,
	Image,
	ImageInsert,
	ImageToolbar,
	Italic,
	Link,
	LinkImage,
	List,
	MediaEmbed,
	MediaEmbedToolbar,
	Paragraph,
	SimpleGrid,
	SourceEditing,
	TextTransformation
];

// Editor configuration.
Editor.defaultConfig = {
	language: 'ru',
	toolbar: {
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'link',
			'|',
			'alignment',
			'bulletedList',
			'numberedList',
			'|',
			'imageInsert',
			'mediaEmbed',
			'|',
			'SimpleGrid',
			'htmlEmbed',
			'|',
			'undo',
			'redo',
			'|',
			'sourceEditing',
		]
	},
	image: {
		toolbar: [
			'imageTextAlternative',
			'linkImage'
		]
	},
	mediaEmbed: {
		previewsInData: true
	},
	htmlSupport: {
		allow: [
			{
				name: /.*/,
				attributes: true,
				classes: true,
				styles: true
			}
		]
	}
};

export default Editor;
