import { Lang } from '@pdfme/common';

type DictEn = typeof dictEn;

const dictEn = {
  cancel: 'Cancel',
  field: 'field',
  fieldName: 'Name',
  require: 'Required',
  uniq: 'Unique',
  inputExample: 'Input Example',
  edit: 'Edit',
  plsInputName: 'Please input name',
  fieldMustUniq: 'Name of field is not unique',
  notUniq: '(Not unique name)',
  noKeyName: 'No name',
  fieldsList: 'List of Fields',
  addNewField: 'Add new field',
  editField: 'Edit Field',
  type: 'Type',
  errorOccurred: 'An error occurred',
  errorBulkUpdateFieldName:
    'Cannot commit the change because the number of items has been changed.',
  commitBulkUpdateFieldName: 'Commit Changes',
  bulkUpdateFieldName: 'Bulk update field names',
};

const dictJa: { [key in keyof DictEn]: string } = {
  cancel: 'キャンセル',
  field: '入力項目',
  fieldName: '項目名',
  require: '必須',
  uniq: '他の項目名と同一不可',
  inputExample: '記入例',
  edit: '編集する',
  plsInputName: '項目名を入力してください',
  fieldMustUniq: '他の入力項目名と被っています',
  notUniq: '(他の項目名と重複しています)',
  noKeyName: '項目名なし',
  fieldsList: '入力項目一覧',
  addNewField: '入力項目を追加',
  editField: '入力項目を編集',
  type: 'タイプ',
  errorOccurred: 'エラーが発生しました',
  errorBulkUpdateFieldName: '項目数が変更されているため変更をコミットできません。',
  commitBulkUpdateFieldName: '変更を反映',
  bulkUpdateFieldName: '項目名を一括変更',
};

const dictEs: { [key in keyof DictEn]: string } = {
  cancel: 'Cancelar',
  field: 'campo',
  fieldName: 'Nombre del Campo',
  require: 'Necesario',
  uniq: 'Unico',
  inputExample: 'Input',
  edit: 'Editar',
  plsInputName: 'PorFavor incluya un nombre',
  fieldMustUniq: 'El nombre del campo no es unico',
  notUniq: '(El nombre no es unico)',
  noKeyName: 'Sin nombre',
  fieldsList: 'Lista de campos',
  addNewField: 'Agregue un Nuevo Campo',
  editField: 'Editar Campo',
  type: 'Tipo',
  errorOccurred: 'Ha ocurrido un error',
  errorBulkUpdateFieldName:
  'No se puede actualizar el cambio porque el numero de elementos ha cambiado',
    
  commitBulkUpdateFieldName: 'Actualizar Cambios',
  bulkUpdateFieldName: 'Actualizar masivamente los campos',
};

const dictAr: { [key in keyof DictEn]: string } = {
  cancel: 'إلغاء',
  field: 'الحقل',
  fieldName: 'اسم الحقل',
  require: 'مطلوب',
  uniq: 'يجب أن يكون فريداً',
  inputExample: 'مثال',
  edit: 'تعديل',
  plsInputName: 'الرجاء إدخال الاسم',
  fieldMustUniq: 'يجب أن يكون الحقل فريداً',
  notUniq: '(غير فريد)',
  noKeyName: 'لا يوجد اسم للحقل',
  fieldsList: 'قائمة الحقول',
  addNewField: 'إضافة حقل جديد',
  editField: 'تعديل الحقل',
  type: 'النوع',
  errorOccurred: 'حدث خطأ',
  errorBulkUpdateFieldName: 'لا يمكن تنفيذ التغيير لأنه تم تغيير عدد العناصر.',
  commitBulkUpdateFieldName: 'تنفيذ التغييرات',
  bulkUpdateFieldName: 'تغيير الأسماء',
};

const i18n = (lang: Lang, key: keyof DictEn) => {
  switch (lang) {
    case 'es':
      return dictEs[key];

    case 'ja':
      return dictJa[key];

    default:
      return dictEn[key];
  }
};

export const curriedI18n = (lang: Lang) => (key: keyof DictEn) => i18n(lang, key);
