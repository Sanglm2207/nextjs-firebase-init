import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'vi'], // Các ngôn ngữ hỗ trợ
  defaultLocale: 'en'    // Ngôn ngữ mặc định
});