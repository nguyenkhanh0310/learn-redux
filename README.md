# Redux:
- Là 1 thư viện mã nguồn mở độc lập, là kiến trúc giúp quản lý state tập trung.
- Redux là 1 PATTERN -> có nhiều ràng buộc và quy tắc mà chúng ta phải tuân theo
### Vì sao phải sử dụng Redux?
- Quản lý Global State
	+ Các components tại mọi nơi trong ứng dụng có thể truy xuất và cập nhật
	+ Giải quyết vấn đề của react khi muốn truyền dữ liệu vào các cấp con cháu
	+ 
- Dễ dàng Debug
- Xử lý caching dữ liệu từ Server
### Vì sao phải sử dụng Redux Toolkit:
- Sinh ra để giải quyết các vấn đề đối với Redux Core
- Việc cấu hình (config) Redux phức tạp:
	+ Phải cài đặt thủ công nhiều packages để Redux có thể hoạt động hiệu quả
	+ Redux yêu cầu rất nhiều boilerplate code
### Khi nào nên sử dụng Redux?
- Dự án có số lượng lớn state và các state được sử dụng ở nhiều nơi
- State được cập nhật thường xuyên
- Logic code cập nhật state phức tạp
- Ứng dụng có số lượng code trung bình hoặc lớn và có nhiều người làm chung
- Cần debug và muốn xem cách state được cập nhật tại bất kỳ khoảng thời gian nào

### Không phải lúc nào cũng nên sử dụng Redux.
Kiến trúc của Redux và các khái niệm cần nắm
- State Management: Quản lý dữ liệu, quản lý trạng thái của ứng dụng. Redux có 1 kho lưu trữ các trạng thái trong ứng dụng
- Immutability (bất biến): không thay đổi giá trị của object hay array -> copy và thay đổi giá trị của arr hay obj copy đó

### Kiến trúc Redux:
#### Reducers:
	- Là 1 function cơ bản:
  ```
  const initialValue = { value: 0}
  const rootReducer = (state = initialValue, action) => {
    switch(action.type) {
      case 'INCREMENT':
        return {
          ...state,
          value: state.value + 1
        }
        default:
          return state;
    }
  }
  ```
  - **Ràng buộc** phải tuân theo:
    + Giá trị state mới luôn luôn được tính toán dựa trên giá trị của state trước đó
    + Không được trực tiếp thay đổi giá trị của state hiện tại, mà phải tạo 1 bản copy (spread syntax) và cập nhật lại giá trị mình mong muốn
    + Không được có đoạn code bất đồng bộ nào (request tới server, math.random, date.now) trong reducer
    -> Các function tuân thủ được những điều trên được gọi là *** PURE FUNCTION ***
      * Chúng ta có thể dự đoán được kết quả trả về của state
      * Tránh gặp bug ở giao diện

#### Action:
  ```
  const INCREMENT = {
    type: 'todoList/increment', -> đoạn text mô tả xem hành động này là gì
    payload: 0, (optional) -> dùng khi muốn tính toán gì đó với state 
  }
  ```
  - Action creators (là 1 function để tạo ra 1 action)
  ```
  const incrementCreator = ( data ) => {
    return {
      type: 'todoList/increment',
      payload: data
    }
  }
  ```
  -> Action creator giúp không phải viết các đoạn code lặp đi lặp lại
#### Dispatch:
  - Là 1 function
  ```
  dispatch(INCREMENT)
  hoặc
  dispatch(incrementCreator(15))
  ```
  - Dispatch nhận vào 1 action