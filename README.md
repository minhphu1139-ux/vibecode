# Bộ Tài Liệu User Flows Hệ Thống E-Learning (Standardized Flows)

Tài liệu đặc tả chi tiết 8 luồng người dùng (User Flows) chính thức của nền tảng đào tạo trực tuyến E-Learning. Mỗi luồng đều bao gồm:
1. **File Markdown (`.md`):** Đặc tả nghiệp vụ, bảng điều kiện, danh sách bước chi tiết, xử lý ngoại lệ và sơ đồ Mermaid.
2. **File Giao diện HTML (`.html`):** Giao diện đồ họa tương tác, hiển thị trực quan sơ đồ luồng Mermaid và các giải thích nghiệp vụ cho đội ngũ Non-technical & Developers.

---

## 🌐 Cổng Điều Hướng Trực Quan
Mở file [index.html](index.html) bằng bất kỳ trình duyệt nào để truy cập Dashboard tổng hợp toàn bộ 8 luồng.

---

## 📋 Danh Mục 8 User Flows Chuẩn Hóa

| Mã Luồng | Tên Luồng | Tài Liệu Markdown | Giao Diện Trực Quan | Trọng Tâm Nghiệp Vụ |
| :---: | :--- | :---: | :---: | :--- |
| **FLOW-01** | **Xác thực & Onboarding** | [01-Xac-Thuc-Va-Onboarding.md](01-Xac-Thuc-Va-Onboarding.md) | [01-Xac-Thuc-Va-Onboarding.html](01-Xac-Thuc-Va-Onboarding.html) | Đăng nhập SSO (Google, Apple), Single Active Session chống share tài khoản, trắc nghiệm đầu vào. |
| **FLOW-02** | **Khám phá & Thanh toán** | [02-Kham-Pha-Va-Thanh-Toan.md](02-Kham-Pha-Va-Thanh-Toan.md) | [02-Kham-Pha-Va-Thanh-Toan.html](02-Kham-Pha-Va-Thanh-Toan.html) | Video học thử (Preview), thanh toán tự động VietQR/VNPAY/MoMo, kích hoạt tức thì qua Webhook. |
| **FLOW-03** | **Trải nghiệm Học tập** | [03-Trai-Nghiem-Hoc-Tap.md](03-Trai-Nghiem-Hoc-Tap.md) | [03-Trai-Nghiem-Hoc-Tap.html](03-Trai-Nghiem-Hoc-Tap.html) | Video HLS Adaptive, Dynamic Watermark chống quay trộm, SCORM 1.2/2004, Heartbeat bookmarking. |
| **FLOW-04** | **Ghi chú & Hỏi đáp (Q&A)** | [04-Hoi-Dap-Va-Tuong-Tac.md](04-Hoi-Dap-Va-Tuong-Tac.md) | [04-Hoi-Dap-Va-Tuong-Tac.html](04-Hoi-Dap-Va-Tuong-Tac.html) | Ghi chú cá nhân gắn timestamp video, hỏi đáp cộng đồng, câu trả lời chính thức từ Giảng viên. |
| **FLOW-05** | **Kiểm tra & Chấm điểm** | [05-Kiem-Tra-Va-Cham-Diem.md](05-Kiem-Tra-Va-Cham-Diem.md) | [05-Kiem-Tra-Va-Cham-Diem.html](05-Kiem-Tra-Va-Cham-Diem.html) | Quizz đếm ngược tự thu bài, Assignment quét virus, học tiếp không tắc nghẽn, chấm theo Rubric. |
| **FLOW-06** | **Lớp học Trực tuyến** | [06-Lop-Hoc-Truc-Tuyen.md](06-Lop-Hoc-Truc-Tuyen.md) | [06-Lop-Hoc-Truc-Tuyen.html](06-Lop-Hoc-Truc-Tuyen.html) | Tích hợp Zoom API / Web SDK, đồng bộ Google Calendar, điểm danh tự động, lưu trữ bản ghi Cloud. |
| **FLOW-07** | **Cấp phát & Xác thực Chứng chỉ** | [07-Cap-Phat-Chung-Chi.md](07-Cap-Phat-Chung-Chi.md) | [07-Cap-Phat-Chung-Chi.html](07-Cap-Phat-Chung-Chi.html) | Render PDF Vector kèm mã QR tra cứu công khai, 1-Click thêm vào LinkedIn, quy trình thu hồi (Revoke). |
| **FLOW-08** | **Quản trị & Giảng viên** | [08-Quan-Tri-He-Thong.md](08-Quan-Tri-He-Thong.md) | [08-Quan-Tri-He-Thong.html](08-Quan-Tri-He-Thong.html) | Phân quyền RBAC, kiểm duyệt xuất bản khóa học, hàng đợi chấm bài và phân tích tỷ lệ rơi rụng (Drop-off). |

---

## 📁 Thư Mục Sao Lưu & Tài Liệu
- Toàn bộ các file nháp cũ đã được sao lưu tại: `_backup/`.
- Tài liệu kiến trúc và đặc tả hệ thống tại: `docs/`.
