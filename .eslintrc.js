module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:prettier/recommended'], // Thêm Prettier vào phần extends
  rules: {
    'prettier/prettier': 'error', // Báo lỗi nếu Prettier không tuân theo quy tắc
  },
};
