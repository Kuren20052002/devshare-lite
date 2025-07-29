# DevShare Lite

## Thông tin tác giả

- Trường: Trường Đại học Công nghệ Thông tin – ĐHQG-HCM
- MSSV: 23520832
- Họ tên: Nguyễn Hoàng Lâm


## Tổng quan dự án

**DevShare Lite** là một diễn đàn trực tuyến nơi người dùng có thể đăng tải các bài viết chia sẻ kiến thức, đặt câu hỏi về các vấn đề kỹ thuật, và tham gia trả lời, bình luận. Mục tiêu là xây dựng một cộng đồng nhỏ, tập trung vào việc trao đổi thông tin trong lĩnh vực CNTT

### Các chức năng chính:

1. **Xác thực người dùng**
   - Đăng ký tài khoản (email, username, password, firstname, lastname, link GitHub/Facebook/LinkedIn).
   - Đăng nhập / Đăng xuất. ( Có thể sài email hoặc username)

2. **Quản lý bài viết**
   - Tạo bài viết với tiêu đề, nội dung rich text (dùng CKEditor 5) và ảnh minh họa.
   - Gắn thẻ (tags) cho bài viết.
   - Phân trang danh sách bài viết.
   - Xem chi tiết bài viết.
   - Chỉnh sửa hoặc xóa bài viết của chính mình.

3. **Bình luận**
   - Bình luận vào bài viết.
   - Trả lời bình luận (Chỉ có 1 lớp trả lời).

4. **Tìm kiếm**
   - Tìm kiếm bài viết theo tiêu đề.

5. **Trang cá nhân**
   - Hiển thị thông tin người dùng (tên, email, bio, avatar, ảnh nền, liên kết GitHub/Facebook/LinkedIn).
   - Chỉnh sửa thông tin cá nhân.

##  Công nghệ sử dụng

###  Frontend

- [Next.js v15.3.5](https://nextjs.org/) – Framework React hỗ trợ SSR và routing tối ưu
- [React v19.0.0](https://react.dev/) – Thư viện UI hiện đại
- [Tailwind CSS v4.1.11](https://tailwindcss.com/) – Framework CSS utility-first
- [ShadCN](https://ui.shadcn.com/) – UI component library dựa trên Radix UI & Tailwind CSS
- [CKEditor 5 React v11.0.0](https://ckeditor.com/ckeditor-5/) – Editor rich text hỗ trợ upload ảnh. Dùng thư viện `@ckeditor/ckeditor5-build-classic` v41.4.2
- [Lucide React v0.525.0](https://lucide.dev/) – Bộ icon mã nguồn mở
- [React Icons v5.5.0](https://react-icons.github.io/react-icons/) – Tổng hợp icon cho React

###  Backend

- [Ruby v3.3.0](https://www.ruby-lang.org/en/) – Ngôn ngữ lập trình chính
- [Ruby on Rails v8.0.2](https://rubyonrails.org/) – Backend framework MVC
- [PostgreSQL v15.x](https://www.postgresql.org/) – Cơ sở dữ liệu quan hệ (tested với 15.5)
- [Devise v4.9.x](https://github.com/heartcombo/devise) – Xác thực người dùng
- [Devise JWT v0.11.x](https://github.com/waiting-for-dev/devise-jwt) – Hỗ trợ JWT cho Devise
- [JSONAPI::Serializer v0.10.x](https://github.com/jsonapi-serializer/jsonapi-serializer) – Serialize dữ liệu chuẩn JSON:API
- [Kaminari v1.x](https://github.com/kaminari/kaminari) – Phân trang
- [Rack-CORS v1.1.x](https://github.com/cyu/rack-cors) – Cho phép frontend khác cổng truy cập API
- [ImageProcessing v1.2.x](https://github.com/janko/image_processing) – Hỗ trợ resize ảnh Active Storage
- **Active Storage + Action Text (built-in)** – Lưu ảnh và nội dung rich text
- Rubocop – Dùng trong môi trường phát triển để kiểm tra style code

### Ghi chú

- Frontend sử dụng **pnpm** để quản lý packages, backend dùng **Bundler**.
- Frontend và backend chạy ở **hai cổng riêng biệt** → đã cấu hình `CORS` trong backend.

> Lý do lựa chọn:
> - **CKEditor**: dễ triển khai, phù hợp mức giá, giao diện trực quan, hỗ trợ ảnh và định dạng văn bản.
> - **Tailwind + ShadCN**: dựng giao diện nhanh và sử dụng dễ dàng.

## Cấu trúc thư mục – DevShare Lite

Dưới đây là mô tả các thư mục chính và file quan trọng trong dự án DevShare Lite.


### Backend – Ruby on Rails

```
backend/
├── app/
│   ├── controllers/     # Xử lý logic cho devise, posts, comments, tags,...
│   ├── models/          # Logic dữ liệu và associations
│   ├── serializers/     # Format file JSON để trả về cho frontend
│   ├── assets/          # Ảnh mặc định
│   ├── jobs/, mailers/ 
│
├── config/              # Tất cả cấu hình app (routes, devise, CORS,...)
├── db/                  # Migrations
├── Gemfile              # Khai báo gem sử dụng
```


### Frontend – Next.js 

```
frontend/
├── app/
|   |── context               # chứa context chia sẻ dữ liệu như đăng nhập      
|   │── login/page.tsx        # Trang đăng nhập
|   │── signup/page.tsx       # Trang đăng kí
|   ├── posts/
|   │   ├── page.tsx
|   │   ├── [id]/page.tsx     # Trang chi tiết bài viết
|   │   └── new/page.tsx      # Trang tạo bài viết
|   |── profile/page.tsx      # Trang cá nhân
|   ├── layout.tsx            # Layout gốc cho toàn app
|   └── page.tsx              # Trang chính (home page)
|
├── components/
│   ├── CKEditorWrapper  # Rich text editor wrapper
│   ├── Comment/         # Chứa form, card, list cho comment
│   ├── Dialog/          # Hộp thoại xác nhận xoá và yêu cầu đăng nhập
│   ├── PostCard/        # Chứa form, card, list cho posts
│   ├── ui/              # Button, input, alert,... từ ShadCN
│   └── ...              # Các component độc lập 
│
├── public/              # Asset tĩnh như hình ảnh

```

## Hướng dẫn cài đặt và khởi chạy dự án

### Yêu cầu

- Node.js (phiên bản tương thích với Next.js 15)
- pnpm
- Ruby 3.3.0
- PostgreSQL
- Rails 8.0.2


### Cài đặt frontend

```bash
cd source_code/frontend
pnpm install
pnpm run dev
```

> Frontend sẽ chạy ở `http://localhost:3000`


### Cài đặt backend

```bash
cd source_code/backend
bundle install
rails db:create db:migrate db:seed
rails s
```

> Backend sẽ chạy ở `http://localhost:3001` (hoặc cổng tự cấu hình)


### Cấu hình môi trường

Backend yêu cầu biến môi trường `DATABASE_PASSWORD` để kết nối PostgreSQL.

Nếu  dùng Linux/macOS:

```bash
export DATABASE_PASSWORD=your_postgres_password
```

Nếu  dùng PowerShell trên Windows:

```powershell
$env:DATABASE_PASSWORD="your_postgres_password"
```

Hoặc tạo file `.env` trong thư mục `backend/` nếu có gem `dotenv-rails`:

```env
DATABASE_PASSWORD=your_postgres_password
```
---

Sau khi hoàn tất các bước trên, có thể truy cập devshare-lite tại `http://localhost:3000`.

