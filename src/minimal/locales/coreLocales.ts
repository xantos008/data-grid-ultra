import { Localization as CoreLocalization } from '@mui/material/locale';

export const beBYCore: CoreLocalization = {
  components: {
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Перайсці на першую старонку';
          }
          if (type === 'last') {
            return 'Перайсці на апошнюю старонку';
          }
          if (type === 'next') {
            return 'Перайсці на наступную старонку';
          }
          // if (type === 'previous') {
          return 'Перайсці на папярэднюю старонку';
        },
        labelRowsPerPage: 'Радкоў на старонцы:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} з ${count !== -1 ? count : `больш чым ${to}`}`,
      },
    },
  },
};

export const urPKCore: CoreLocalization = {
  components: {
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'پہلے صفحے پر جائیں';
          }
          if (type === 'last') {
            return 'آخری صفحے پر جائیں';
          }
          if (type === 'next') {
            return 'اگلے صفحے پر جائیں';
          }
          // if (type === 'previous') {
          return 'پچھلے صفحے پر جائیں';
        },
        labelRowsPerPage: 'ایک صفحے پر قطاریں:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${count !== -1 ? `${count} میں سے` : `${to} سے ذیادہ میں سے`} ${from} سے ${to} قطاریں`,
      },
    },
  },
};
