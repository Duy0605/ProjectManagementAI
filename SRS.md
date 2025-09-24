1.	Giới thiệu
1.1.	Mục tiêu tài liệu
Tài liệu đặc tả yêu cầu phần mềm (Software Requirements Specification – SRS) này mô tả chi tiết:
•	Các yêu cầu chức năng và phi chức năng của hệ thống Project Management AI Assistant.
•	Các tương tác chính giữa người dùng và hệ thống.
•	Các ràng buộc về thiết kế, công nghệ, hiệu năng, bảo mật.
Mục tiêu của tài liệu:
•	Làm cơ sở cho nhóm phát triển (backend, frontend, AI, DevOps) trong quá trình xây dựng hệ thống.
•	Giúp stakeholder (khách hàng, quản lý, người dùng) hiểu rõ tính năng và phạm vi hệ thống.
1.2.	Phạm vi hệ thống
Project Management AI Assistant là một hệ thống quản lý dự án trực tuyến, hỗ trợ nhóm phát triển phần mềm hoặc nhóm làm việc trong các lĩnh vực khác nhau.
Hệ thống cung cấp các chức năng chính:
•	Quản lý dự án & công việc: Tạo dự án, phân chia task, quản lý tiến độ, gán deadline, báo cáo.
•	Hỗ trợ Agile (Scrum/Kanban): Quản lý sprint, backlog, kanban board với drag & drop trực quan.
•	Cộng tác nhóm: Chat nhóm/riêng, gửi file, thông báo realtime.
•	AI Assistant (Gemini API):
o	Nhắc nhở thông minh về deadline.
o	Dự đoán tiến độ dự án.
o	Đề xuất phân chia công việc.
o	Chatbot hỗ trợ hỏi đáp và hướng dẫn sử dụng.
•	Bảo mật & phân quyền: Quản lý user, phân vai trò (Admin, PM, Member, Guest).
Hệ thống sẽ được triển khai dưới dạng web app có thể truy cập trên trình duyệt (desktop, tablet, mobile).
Lợi ích chính của hệ thống:
•	Giúp nhóm làm việc minh bạch, dễ dàng theo dõi tiến độ.
•	Tự động hóa một phần quản lý nhờ AI, tiết kiệm thời gian của PM.
•	Tăng khả năng phối hợp nhờ chat realtime và thông báo thông minh.
•	Có thể mở rộng để dùng cho nhiều loại hình nhóm (IT, marketing, nghiên cứu, giáo dục...).
 
1.3.	Thuật ngữ và định nghĩa
•	Sprint: Chu kỳ phát triển ngắn (1–4 tuần) trong Scrum.
•	Backlog: Danh sách công việc cần thực hiện.
•	Kanban: Bảng trực quan thể hiện trạng thái task (To Do, In Progress, Done).
•	AI Assistant: Trợ lý AI sử dụng Gemini API để nhắc nhở, phân tích, hỗ trợ người dùng.
•	PM (Project Manager): Người quản lý dự án, chịu trách nhiệm tạo, giám sát, phân công task.
•	RBAC (Role-Based Access Control): Mô hình phân quyền dựa trên vai trò người dùng.
•	JWT (JSON Web Token): Cơ chế xác thực người dùng.
1.4.	Tài liệu tham khảo
•	Jira Software Documentation – hướng dẫn quản lý dự án theo Scrum/Kanban.
•	Agile Manifesto & Scrum Guide – nguyên lý và phương pháp Agile/Scrum.
•	Google Gemini API Documentation – tích hợp AI Assistant.
2.	Mô tả tổng quan
2.1.	Đối tượng sử dụng
Hệ thống Project Management AI Assistant hướng đến ba nhóm người dùng chính:
•	Project Manager (PM)
o	Tạo và quản lý dự án: khởi tạo sprint, backlog, milestone.
o	Phân công công việc cho các thành viên, theo dõi tiến độ bằng Kanban board và báo cáo.
o	Sử dụng AI Assistant để phân tích dữ liệu, dự đoán rủi ro và tối ưu quy trình quản lý.
•	Member (Thành viên nhóm)
o	Nhận công việc được giao, cập nhật trạng thái task (To Do, In Progress, Review, Done).
o	Tham gia thảo luận qua chat nhóm hoặc chat riêng.
o	Nhận thông báo deadline, nhắc nhở thông minh từ AI và gợi ý cải thiện tiến độ.
•	Guest/Client (Khách hàng/Khách mời)
o	Truy cập ở chế độ chỉ đọc: xem tiến độ, báo cáo và kết quả dự án.
o	Không có quyền chỉnh sửa hay quản lý công việc.
o	Giúp tăng tính minh bạch và tạo sự tin tưởng với khách hàng.

 
2.2.	Môi trường hoạt động
Hệ thống được triển khai trong môi trường web hiện đại:
•	Phần cứng
o	Máy chủ: Cloud server (AWS, GCP hoặc Azure)
o	Thiết bị người dùng: PC, laptop hoặc smartphone có trình duyệt hiện đại.
•	Phần mềm
o	Backend: Node.js (Express.js), MongoDB, Redis, Socket.IO.
o	Frontend: React.js (SPA), Redux Toolkit/React Query, TailwindCSS, Shadcn/UI.
o	Hệ điều hành: Hỗ trợ Windows, Linux, macOS.
o	Trình duyệt: Chrome, Firefox, Edge, Safari (phiên bản ≥ 2020).
•	Mạng
o	Yêu cầu kết nối Internet ổn định.
o	WebSocket cần độ trễ thấp để chat realtime và drag & drop mượt mà.
o	Giao tiếp qua HTTPS để đảm bảo an toàn dữ liệu.
3.	Yêu cầu chức năng
3.1.	Quản lý người dùng
•	Hệ thống cho phép người dùng đăng ký tài khoản mới với các thông tin cơ bản (tên, email, mật khẩu).
•	Người dùng có thể đăng nhập bằng email và mật khẩu đã đăng ký.
•	Hệ thống cung cấp chức năng đăng xuất an toàn.
•	Hệ thống hỗ trợ reset mật khẩu qua email (gửi link xác nhận).
•	Người dùng có thể cập nhật hồ sơ cá nhân (avatar, số điện thoại, vị trí công việc).
•	Hệ thống phân quyền theo RBAC:
o	Project Manager (PM)
o	Member
o	Guest/Client
3.2.	Quản lý dự án
•	PM có thể tạo dự án mới với các thông tin: tên, mô tả, thời gian bắt đầu, thời gian kết thúc.
•	PM có thể chỉnh sửa/xóa dự án.
•	PM có thể gán thành viên vào dự án và chỉ định vai trò.
•	Mỗi dự án có trạng thái: Đang thực hiện, Hoàn thành, Tạm dừng.
•	Guest/Client chỉ có quyền xem trạng thái và tiến độ dự án.
3.3.	Quản lý công việc (Task/Issue)
•	PM hoặc Member có thể tạo task với các thuộc tính: tiêu đề, mô tả, deadline, độ ưu tiên, file đính kèm.
•	Hệ thống cho phép cập nhật task (chỉnh sửa nội dung, thay đổi deadline, thêm nhãn).
•	Task có các trạng thái: To Do → In Progress → Review → Done.
•	Thành viên có thể thay đổi trạng thái task bằng cách kéo và thả.
3.4.	Sprint và Board
•	PM có thể tạo sprint mới, gán backlog cho sprint.
•	Thành viên có thể kéo thả task giữa các cột
•	Hệ thống hiển thị biểu đồ Burn Down Chart để theo dõi tiến độ sprint.
•	Sprint có thể kết thúc thủ công bởi PM hoặc tự động kết thúc khi hết thời gian.
3.5.	Chat và Cộng tác
•	Người dùng có thể chat theo nhóm dự án.
•	Người dùng có thể chat riêng (1-1).
•	Hệ thống hỗ trợ gửi file (PDF, ảnh, tài liệu ≤ 20MB).
•	Hệ thống hỗ trợ nhắc tên thành viên bằng “@username”.
•	Tin nhắn realtime, sử dụng WebSocket (Socket.IO).
3.6.	Thông báo và Nhắc nhở
•	Hệ thống gửi thông báo khi có task mới được giao.
•	Hệ thống gửi thông báo khi task sắp đến deadline (≥ 24h trước hạn).
•	AI Assistant gửi nhắc nhở thông minh dựa trên tiến độ và thói quen làm việc.
•	Người dùng có thể tùy chỉnh loại thông báo muốn nhận (email, trong app, push notification).
3.7.	Báo cáo và Dashboard
•	PM có thể xem báo cáo hiệu suất theo thành viên (số task hoàn thành, số task trễ hạn).
•	Hệ thống hiển thị biểu đồ tiến độ dự án theo thời gian.
•	Dashboard cá nhân hiển thị công việc hiện tại, deadline sắp tới, thông báo quan trọng.
3.8.	Tích hợp AI
•	AI Assistant đóng vai trò chatbot hỗ trợ người dùng đặt câu hỏi (Q&A).
•	AI phân tích backlog và gợi ý cách chia task hợp lý.
•	AI dự đoán tiến độ dự án dựa trên dữ liệu task và lịch sử làm việc.
•	AI cảnh báo rủi ro nếu có nhiều task bị chậm deadline.
3.9.	Bảo mật và Xác thực
•	Hệ thống xác thực người dùng bằng JWT.
•	Hệ thống hash mật khẩu bằng BCrypt.
•	Hệ thống áp dụng RBAC để phân quyền rõ ràng cho PM, Member, Guest.
•	Hệ thống áp dụng rate limiting để chống brute-force login.
•	Hệ thống bật CORS và Helmet.js để bảo mật API.
4.	Yêu cầu phi chức năng
4.1.	Hiệu năng
•	Hệ thống phải hỗ trợ tối thiểu 500 người dùng đồng thời với thời gian phản hồi trung bình ≤ 2 giây cho các thao tác CRUD cơ bản.
•	Thời gian tải trang Dashboard ≤ 3 giây với băng thông ≥ 10 Mbps.
•	Thời gian gửi/nhận tin nhắn trong chat realtime ≤ 1 giây.
•	Biểu đồ Burn Down Chart và Dashboard phải cập nhật dữ liệu mới trong vòng ≤ 5 giây khi có thay đổi.
4.2.	Bảo mật
•	Hệ thống phải sử dụng JWT (JSON Web Token) để xác thực phiên người dùng.
•	Mật khẩu người dùng phải được mã hóa bằng BCrypt với salt ≥ 10.
•	Hệ thống phải chống được các lỗ hổng phổ biến:
o	XSS (Cross-site Scripting).
o	CSRF (Cross-site Request Forgery).
o	SQL Injection (hoặc NoSQL Injection trong MongoDB).
•	Tất cả dữ liệu truyền qua mạng phải được mã hóa bằng HTTPS (TLS 1.2 trở lên).
•	Hệ thống phải có cơ chế Rate limiting: tối đa 5 lần đăng nhập thất bại trong 1 phút cho mỗi IP.
5.	Giao diện người dùng
5.1.	Wireframe và Screens
5.1.1.	Dashboard
5.1.2.	Project
5.1.3.	Board
5.1.4.	Team Chat
5.1.5.	AI Assistant
5.1.6.	Team
5.1.7.	Analytics
5.1.8.	Setting
5.2.	Yêu cầu UI/UX
•	Responsive Design
o	Giao diện phải tương thích với desktop, laptop, tablet, mobile.
o	Các thành phần UI phải co giãn hợp lý khi thay đổi kích thước màn hình.
•	Dark/Light Mode
o	Người dùng có thể chuyển đổi giữa giao diện tối và sáng.
o	Màu sắc phải đảm bảo độ tương phản để dễ đọc.
•	Drag & Drop
o	Kanban board và backlog phải hỗ trợ kéo thả trực quan.
o	Thao tác phải mượt mà, realtime update khi kéo thả thành công.
•	Trải nghiệm người dùng (UX)
o	Task card phải có tooltip hiển thị chi tiết khi hover.
o	Các thông báo quan trọng (deadline, task bị overdue) hiển thị dưới dạng banner hoặc toast notification.
o	Sử dụng icon + màu sắc để phân biệt mức độ ưu tiên (High/Medium/Low).
•	Consistency (Tính nhất quán)
o	Toàn bộ hệ thống sử dụng bộ design system chung: màu sắc, typography, spacing.
o	Các nút hành động (button) phải thống nhất về kích thước và style (primary, secondary, danger).
6.	Yêu cầu công nghệ
6.1.	Backend
•	Ngôn ngữ & Framework
o	Node.js (v20 trở lên).
o	Express.js: xây dựng REST API, xử lý routing và middleware.
•	Quản lý phiên & bảo mật
o	JWT (JSON Web Token): xác thực người dùng.
o	BCrypt: mã hóa mật khẩu.
o	Helmet.js: bảo vệ HTTP headers.
o	Rate limiting: hạn chế brute-force attack.
o	CORS: cho phép truy cập từ frontend.
•	Realtime Communication
o	Socket.IO: hỗ trợ chat nhóm, thông báo, cập nhật Kanban realtime.
•	Tích hợp AI
o	Gemini API (Google AI): chatbot, dự đoán tiến độ, nhắc nhở thông minh.
o	Giao tiếp qua HTTPS REST API.
6.2.	Frontend
•	Ngôn ngữ & Framework
o	React.js (SPA – Single Page Application).
o	React Router: định tuyến trang.
o	Redux Toolkit hoặc React Query: quản lý state và data fetching.
•	UI/UX
o	TailwindCSS: thiết kế responsive.
o	Shadcn/UI: thư viện component.
o	React Beautiful DnD hoặc DndKit: kéo thả Kanban board.
o	Dark/Light mode tích hợp sẵn.
•	Realtime
o	Socket.IO Client: đồng bộ thông báo, chat, thay đổi task theo thời gian thực.
•	Tích hợp AI
o	Chatbot UI hiển thị hội thoại với Gemini API.
6.3.	Cơ sở dữ liệu
•	MongoDB (NoSQL) làm cơ sở dữ liệu chính.
•	Mongoose: ORM cho Node.js.
•	Redis: cache dữ liệu (ví dụ: session, thông báo, dữ liệu tạm thời).
•	Cấu trúc dữ liệu chính:
o	User, Project, Sprint, Task, Message, Notification, AI Suggestion.
6.4.	Triển khai
•	Web Server
o	Nginx: reverse proxy, load balancing, SSL termination.
•	Hosting & Domain
o	Domain từ Tenten.
o	DNS & CDN: Cloudflare.
7.	Thiết kế hệ thống
7.1.	Sequence Diagram

7.2.	Class Diagram

8.	Use Cases
8.1.	Use Case tổng quát
8.2.	Use Case đăng nhập
8.3.	Use Case tạo dự án mới
8.4.	Use Case quản lý công việc
8.5.	Use Case lập kế hoạch Sprint
8.6.	Use Case nhắn tin
8.7.	Use Case thông báo và nhắc nhở
8.8.	Use Case tương tác với trợ lý AI
8.9.	Use Case xem báo cáo dự án
8.10.	Use Case AI dự đoán tiến độ.
