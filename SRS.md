1.	Giới thiệu
1.1.	Mục tiêu tài liệu
Tài liệu đặc tả yêu cầu phần mềm (Software Requirements Specification – SRS) này mô tả chi tiết toàn bộ yêu cầu chức năng, phi chức năng, kiến trúc công nghệ và phạm vi hoạt động của hệ thống Project Management AI Assistant – một nền tảng web hỗ trợ quản lý dự án, công việc và cộng tác nhóm, tích hợp trí tuệ nhân tạo (AI) nhằm tối ưu hiệu suất làm việc và ra quyết định:
•	Mục tiêu của tài liệu:
o	Xác định rõ các yêu cầu nghiệp vụ và kỹ thuật cần thiết để phát triển hệ thống.
o	Làm cơ sở cho nhóm phát triển (Backend, Frontend, AI, DevOps) triển khai, kiểm thử và bảo trì sản phẩm.
o	Giúp stakeholder (khách hàng, quản lý, người dùng cuối, nhóm phát triển) hiểu rõ phạm vi, mục tiêu, chức năng và đặc tính của hệ thống.
o	Đảm bảo thống nhất giữa các bên liên quan về yêu cầu, phạm vi và tiêu chí đánh giá hệ thống trong toàn bộ vòng đời phát triển phần mềm.
1.2.	Phạm vi hệ thống
Project Management AI Assistant là một nền tảng web cho phép cá nhân hoặc nhóm làm việc quản lý dự án, công việc và cộng tác một cách thông minh.
•	Hệ thống tích hợp AI Assistant (sử dụng Google Gemini API) để:
o	Phân tích dữ liệu công việc và tiến độ dự án.
o	Dự đoán rủi ro và gợi ý phân bổ tài nguyên hợp lý.
o	Tự động nhắc nhở deadline và hỗ trợ người dùng trong quá trình làm việc.
•	Đối tượng sử dụng chính:
o	Người tạo dự án (Project Owner/Manager): Tạo và quản lý dự án, phân công công việc, theo dõi tiến độ, sử dụng AI để tối ưu hiệu quả.
o	Thành viên dự án (Member): Thực hiện các task được giao, cập nhật tiến độ, trao đổi trong nhóm chat và nhận gợi ý thông minh từ AI.
1.3.	Tài liệu tham khảo
•	Jira Software Documentation – hướng dẫn quản lý dự án theo Kanban.
•	Google Gemini API Documentation – Tài liệu hướng dẫn tích hợp và sử dụng Gemini API cho AI Assistant.
•	MongoDB & Mongoose Guide – Tài liệu tham khảo về thiết kế cơ sở dữ liệu NoSQL và quản lý schema.
2.	Mô tả tổng quan
2.1.	Đối tượng sử dụng
Hệ thống Project Management AI Assistant hướng đến người dùng là các cá nhân hoặc nhóm làm việc cần quản lý dự án và công việc hiệu quả.
Mỗi người dùng chỉ cần một tài khoản duy nhất và có thể đảm nhận nhiều vai trò khác nhau trong từng dự án:
•	Người tạo dự án (Project Owner/manager): Là người khởi tạo và có toàn quyền quản lý dự án:
o	Thêm hoặc xóa thành viên.
o	Phân công công việc cho các thành viên, theo dõi tiến độ bằng bảng Kanban, biểu đồ tiến độ và báo cáo.
o	Sử dụng AI Assistant để phân tích dữ liệu, dự đoán rủi ro và tối ưu quy trình làm việc.
•	Thành viên dự án (Member): Là người được mời tham gia vào dự án, có quyền thao tác trên các task được giao:
o	Cập nhật trạng thái công việc (To Do, In Progress, Review, Done).
o	Thảo luận, trao đổi trong nhóm chat.
o	Nhận thông báo và gợi ý thông minh từ AI Assistant để cải thiện hiệu suất làm việc.
2.2.	Phạm vi hoạt động
•	Hệ thống Project Management AI Assistant là một nền tảng web hỗ trợ người dùng quản lý dự án, công việc và cộng tác nhóm một cách hiệu quả, tích hợp trí tuệ nhân tạo (AI) nhằm tối ưu quy trình làm việc và ra quyết định.
•	Hệ thống cho phép mỗi người dùng đăng ký tài khoản, tạo dự án riêng hoặc tham gia vào các dự án khác thông qua lời mời. Quyền hạn của người dùng trong mỗi dự án được xác định theo vai trò (người tạo dự án hoặc thành viên được mời).
 
3.	Yêu cầu chức năng
Hệ thống Project Management AI Assistant cung cấp các nhóm chức năng chính như sau:
•	Quản lý tài khoản người dùng: Người dùng có thể đăng ký, đăng nhập và quản lý hồ sơ cá nhân của mình để truy cập và sử dụng các tính năng của hệ thống.
o	Cho phép người dùng đăng ký tài khoản mới với các thông tin cơ bản (họ tên, email, mật khẩu).
o	Cho phép người dùng đăng nhập bằng email và mật khẩu đã đăng ký.
o	Cho phép người dùng đặt lại mật khẩu qua email khi quên mật khẩu.
o	Cho phép người dùng xem và chỉnh sửa thông tin hồ sơ cá nhân (ảnh đại diện, vị trí, mô tả công việc, số điện thoại).
o	Cho phép người dùng đăng xuất khỏi hệ thống một cách an toàn.
o	Lưu trữ và bảo mật thông tin đăng nhập bằng phương thức hash mật khẩu (BCrypt) và JWT authentication.
•	Quản lý dự án: Người dùng có thể tạo, quản lý, chỉnh sửa và chia sẻ các dự án của mình. Mỗi dự án có thể bao gồm nhiều thành viên với các vai trò khác nhau:
o	Cho phép tạo dự án mới với các thông tin: tên dự án, mô tả, ngày bắt đầu, ngày kết thúc (tuỳ chọn).
o	Cho phép mời người dùng khác tham gia vào dự án qua email hoặc liên kết mời.
o	Cho phép gán quyền cho thành viên trong dự án (người quản lý, thành viên, người xem).
o	Cho phép xem danh sách dự án mà người dùng tham gia hoặc sở hữu.
o	Cho phép chỉnh sửa hoặc xóa dự án nếu là người tạo dự án.
o	Hiển thị trạng thái dự án: Đang thực hiện, Tạm dừng, Hoàn thành.
•	Quản lý công việc: Cung cấp công cụ để tạo, giao, cập nhật và theo dõi công việc trong từng dự án:
o	Cho phép tạo công việc mới (task) với các thông tin: tiêu đề, mô tả, deadline, độ ưu tiên, người thực hiện, nhãn (label).
o	Cho phép chỉnh sửa, cập nhật trạng thái và xóa task.
o	Hỗ trợ thay đổi trạng thái task theo quy trình: To Do → In Progress → Review → Done.
o	Cho phép kéo thả task trực quan trên bảng Kanban.
o	Cho phép xem chi tiết task (mô tả, tiến độ, thành viên thực hiện).
•	Trò chuyện và cộng tác: Người dùng có thể trao đổi, gửi file, và thảo luận trực tiếp trong từng dự án:
o	Cho phép nhắn tin cá nhân (1-1) giữa hai người dùng.
o	Cho phép nhắn tin nhóm trong phạm vi từng dự án.
o	Hỗ trợ gửi file đính kèm (ảnh, tài liệu, video nhỏ, link).
o	Tin nhắn hiển thị real-time (sử dụng Socket.IO hoặc WebSocket).
o	Lưu lịch sử trò chuyện để người dùng có thể xem lại bất kỳ lúc nào.
•	Quản lý thông báo: Hệ thống gửi thông báo cho người dùng về các hoạt động, thay đổi hoặc sự kiện quan trọng:
o	Thông báo khi có task mới được giao, deadline sắp đến, hoặc dự án được cập nhật.
o	Cho phép người dùng chọn loại thông báo muốn nhận (email, push notification, in-app).
o	Cho phép xem danh sách thông báo và đánh dấu đã đọc.
o	Cho phép xóa thông báo hoặc tắt một số loại thông báo cụ thể.
•	AI Assistant: Trí tuệ nhân tạo hỗ trợ người dùng trong việc phân tích, dự đoán và tối ưu quy trình làm việc:
o	Cho phép người dùng trò chuyện với AI Assistant (chatbot Q&A).
o	AI có thể phân tích backlog, tiến độ task, khối lượng công việc và đưa ra gợi ý tối ưu.
o	AI có thể dự đoán tiến độ dự án, cảnh báo khi có nhiều công việc chậm deadline.
o	AI có thể tự động nhắc nhở deadline, gửi gợi ý hoặc thông báo thông minh.
4.	Yêu cầu phi chức năng
•	Hiệu năng:
o	Hệ thống phải hỗ trợ tối thiểu 100 người dùng đồng thời với thời gian phản hồi trung bình ≤ 2 giây cho các thao tác CRUD cơ bản.
o	Thời gian tải trang Dashboard ≤ 3 giây với băng thông ≥ 10 Mbps.
o	Thời gian gửi/nhận tin nhắn trong chat realtime ≤ 1 giây.
o	Biểu đồ Burn Down Chart và Dashboard phải cập nhật dữ liệu mới trong vòng ≤ 5 giây khi có thay đổi.
 
•	Bảo mật:
o	Hệ thống phải sử dụng JWT (JSON Web Token) để xác thực phiên người dùng.
o	Mật khẩu người dùng phải được mã hóa bằng BCrypt với salt ≥ 10.
o	Hệ thống phải chống được các lỗ hổng phổ biến:
XSS (Cross-site Scripting).
CSRF (Cross-site Request Forgery).
SQL Injection (hoặc NoSQL Injection trong MongoDB).
o	Tất cả dữ liệu truyền qua mạng phải được mã hóa bằng HTTPS (TLS 1.2 trở lên).
o	Hệ thống phải có cơ chế Rate limiting: tối đa 5 lần đăng nhập thất bại trong 1 phút cho mỗi địa chỉ IP.
•	Khả năng sử dụng:
o	Giao diện người dùng (UI) cần đơn giản, trực quan, hiện đại.
o	Toàn bộ thao tác chính phải thực hiện được trong tối đa 3 lần click.
o	Hệ thống cần hỗ trợ dark mode và đa ngôn ngữ (trước mắt là tiếng Anh và tiếng Việt).
o	Cung cấp hướng dẫn sử dụng tích hợp (onboarding tutorial) cho người dùng mới.
•	Tính tương thích:
o	Hệ thống phải hoạt động ổn định và hiển thị đúng giao diện trên các trình duyệt web phổ biến, bao gồm: Google Chrome, Microsoft Edge, Mozilla Firefox, và Safari (các phiên bản cập nhật mới nhất).
o	Ứng dụng web phải được thiết kế responsive (tự động thích ứng kích thước) để đảm bảo trải nghiệm người dùng tốt trên máy tính để bàn, laptop và tablet.
5.	Yêu cầu công nghệ
5.1.	Backend
•	Ngôn ngữ & Framework:
o	Node.js (v20 trở lên): Nền tảng backend mạnh mẽ, hỗ trợ xử lý bất đồng bộ (asynchronous) giúp tăng hiệu năng cho các tác vụ realtime như chat, notification.
o	Express.js: Framework phổ biến, linh hoạt, giúp tổ chức routing, middleware và RESTful API gọn gàng, dễ mở rộng.
•	Kiến trúc tổ chức:
o	Modular Monolith: Mã nguồn backend được tổ chức theo module, giúp dễ dàng mở rộng.
o	Controller – Service – Model pattern: Tách biệt rõ ràng logic xử lý nghiệp vụ, thao tác dữ liệu, và routing.
•	Quản lý phiên & Bảo mật:
o	JWT (JSON Web Token): Dùng để xác thực người dùng và phân quyền truy cập tài nguyên.
o	BCrypt: Mã hóa mật khẩu trước khi lưu trữ vào cơ sở dữ liệu.
o	Helmet.js: Thiết lập bảo vệ HTTP headers, giảm nguy cơ tấn công XSS, clickjacking...
o	Rate Limiting: Giới hạn số lần đăng nhập sai trong một khoảng thời gian để ngăn brute-force attack.
o	CORS: Cho phép frontend truy cập API an toàn và có kiểm soát.
o	HTTPS (TLS 1.2 trở lên): Bắt buộc sử dụng khi triển khai thực tế để đảm bảo dữ liệu được mã hóa trong quá trình truyền tải.
•	Giao tiếp thời gian thực:
o	Socket.IO: Cho phép truyền dữ liệu hai chiều giữa client và server. Được dùng để chat nhóm hoặc chat riêng realtime, gửi thông báo tức thời, Cập nhật Kanban board hoặc task realtime giữa các thành viên trong dự án.
•	Tích hợp AI:
o	Gemini API (Google AI): Làm chatbot hỗ trợ người dùng hỏi đáp trực tiếp trong ứng dụng, phân tích tiến độ, gợi ý phân chia task, nhắc nhở deadline thông minh, giao tiếp thông qua HTTPS REST API, được gọi trực tiếp từ server backend để đảm bảo an toàn khóa API và tốc độ xử lý.
5.2.	Frontend
•	Ngôn ngữ & Framework:
o	React.js: Giúp tạo ứng dụng web tương tác, tốc độ cao, trải nghiệm người dùng mượt mà.
o	React Router: Quản lý định tuyến giữa các trang.
o	Redux Toolkit hoặc React Query: Quản lý state toàn cục, đồng bộ dữ liệu giữa các component và API hiệu quả.
•	UI/UX và Thiết kế giao diện:
o	TailwindCSS: Thiết kế giao diện responsive nhanh, thống nhất, hiện đại.
o	Shadcn/UI: Thư viện component React có sẵn, giúp tăng tốc phát triển UI.
o	React Beautiful DnD hoặc DndKit: Hỗ trợ kéo thả (drag & drop) trực quan trên Kanban board.
o	Hỗ trợ Dark/Light mode: Cải thiện trải nghiệm người dùng, cho phép tùy chỉnh giao diện.
•	Realtime (Client-side):
o	Socket.IO Client: Kết nối với server backend để nhận thông báo, tin nhắn realtime, cập nhật task hoặc board khi có thay đổi.
5.3.	Cơ sở dữ liệu
•	MongoDB (NoSQL): Cung cấp khả năng lưu trữ linh hoạt, dễ mở rộng, phù hợp với dữ liệu phi cấu trúc như task, message, và notification.
•	Mongoose: Thư viện ODM (Object Data Modeling) dành cho Node.js, giúp định nghĩa schema, validate dữ liệu, quản lý quan hệ giữa các collection và hỗ trợ truy vấn dễ dàng.
•	Redis: Được sử dụng làm cache tạm thời để tăng hiệu năng truy xuất dữ liệu, đặc biệt cho session đăng nhập, thông báo realtime, và trạng thái người dùng online.
