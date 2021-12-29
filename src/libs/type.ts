/* eslint dot-notation: "off"*/
import { PDFImage } from 'pdf-lib';
import { z } from 'zod';

export interface InputImageCache {
  [key: string]: PDFImage;
}

export interface GuidesInterface {
  getGuides(): number[];
  scroll(pos: number): void;
  scrollGuides(pos: number): void;
  loadGuides(guides: number[]): void;
  resize(): void;
}

export type SchemaUIProps = {
  schema: Schema;
  editable: boolean;
  placeholder: string;
  tabIndex: number;
  onChange: (value: string) => void;
};

const langValues = ['en', 'ja'] as const;
const Lang = z.enum(langValues);
export type Lang = z.infer<typeof Lang>;

const templateSchemaType = [
  'text',
  'image',
  'qrcode',
  'japanpost',
  'ean13',
  'ean8',
  'code39',
  'code128',
  'nw7',
  'itf14',
  'upca',
  'upce',
] as const;
const TemplateSchemaType = z.enum(templateSchemaType);
type TemplateSchemaType = z.infer<typeof TemplateSchemaType>;

export type BarCodeType = Exclude<TemplateSchemaType, 'text' | 'image'>;

const alignmentType = ['left', 'right', 'center'] as const;
const Alignment = z.enum(alignmentType);
export type Alignment = z.infer<typeof Alignment>;

const PageSize = z.object({ height: z.number(), width: z.number() });
export type PageSize = z.infer<typeof PageSize>;
export const isPageSize = (arg: BasePdf): arg is PageSize =>
  typeof arg === 'object' && 'width' in arg;

const ArrayBufferSchema: z.ZodSchema<ArrayBuffer> = z.any().refine((v) => v instanceof ArrayBuffer);
const Uint8ArraySchema: z.ZodSchema<Uint8Array> = z.any().refine((v) => v instanceof Uint8Array);
const Data = z.union([z.string(), ArrayBufferSchema, Uint8ArraySchema]);

const Font = z.record(
  z.object({
    data: Data,
    default: z.boolean().optional(),
    subset: z.boolean().optional(),
    index: z.number().optional(),
  })
);
export type Font = z.infer<typeof Font>;

const BasePdf = z.union([PageSize, Data]);
export type BasePdf = z.infer<typeof BasePdf>;

const TemplateSchema = z.object({
  type: TemplateSchemaType,
  position: z.object({ x: z.number(), y: z.number() }),
  width: z.number(),
  height: z.number(),
  rotate: z.number().optional(),
  alignment: Alignment.optional(),
  // TODO 画像やバーコードには無駄なプロパティ。typeでそれぞれを分けたい。
  fontSize: z.number().optional(),
  fontName: z.string().optional(),
  fontColor: z.string().optional(),
  backgroundColor: z.string().optional(),
  characterSpacing: z.number().optional(),
  lineHeight: z.number().optional(),
});
export type TemplateSchema = z.infer<typeof TemplateSchema>;

const Schemas = z.array(z.record(TemplateSchema));
export type Schemas = z.infer<typeof Schemas>;

const Template = z.object({
  schemas: Schemas,
  basePdf: BasePdf,
  sampledata: z.array(z.record(z.string())).optional(),
  columns: z.array(z.string()).optional(),
});
export type Template = z.infer<typeof Template>;

// TODO 名前が適当すぎる。ひどい 混乱の元。これはUIだけで使われる
const Schema = z.intersection(
  TemplateSchema,
  z.object({ id: z.string(), key: z.string(), data: z.string() })
);
export type Schema = z.infer<typeof Schema>;

const Inputs = z.array(z.record(z.string()));

const HTMLElementSchema: z.ZodSchema<HTMLElement> = z.any().refine((v) => v instanceof HTMLElement);
export const UIProps = z.object({
  domContainer: HTMLElementSchema,
  template: Template,
  size: PageSize,
  options: z.object({ lang: Lang.optional(), font: Font.optional() }).optional(),
});
export type UIProps = z.infer<typeof UIProps>;

// --------------------------------------------------

export const GenerateProps = z.object({
  inputs: Inputs,
  template: Template,
  options: z.object({ font: Font.optional(), splitThreshold: z.number().optional() }).optional(),
});
export type GenerateProps = z.infer<typeof GenerateProps>;

export const PreviewProps = UIProps.extend({
  inputs: Inputs,
  onChangeInput: z
    .function()
    .args(z.object({ index: z.number(), value: z.string(), key: z.string() }))
    .returns(z.void())
    .optional(),
});
export type PreviewProps = z.infer<typeof PreviewProps>;
const PreviewReactProps = PreviewProps.omit({ domContainer: true });
export type PreviewReactProps = z.infer<typeof PreviewReactProps>;

export const TemplateDesignerProps = UIProps.extend({
  saveTemplate: z.function().args(Template).returns(z.void()),
});
export type TemplateDesignerProps = z.infer<typeof TemplateDesignerProps>;
const TemplateDesignerReactProps = TemplateDesignerProps.omit({ domContainer: true });
export type TemplateDesignerReactProps = z.infer<typeof TemplateDesignerReactProps>;
