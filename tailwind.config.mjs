/** @type {import('tailwindcss').Config} */
const config = {
  // Thay đổi ở đây: Thêm tiền tố "./src/" vào tất cả các đường dẫn
  content: [
    // Quét các tệp trong src/app/
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Quét các tệp trong src/components/
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // Giữ lại pages nếu bạn còn dùng, hoặc thay đổi nếu pages nằm trong src
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  // Bạn đang dùng DaisyUI và tw-animate-css, nên cần thêm chúng vào plugins
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"), // Nếu DaisyUI là plugin NPM
    // Lưu ý: "tw-animate-css" thường là một tập hợp các lớp tùy chỉnh, không phải plugin
  ],
  // Thêm cấu hình DaisyUI (tùy chọn)
  daisyui: {
    themes: ["light"],
  },
};

export default config;
