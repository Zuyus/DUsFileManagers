using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;

namespace NDExplorer.common
{
    public class File_Manager
    {
        protected string _rootPath;
        protected string _command;
        protected string _value;

        //Dùng trường hợp đổi tên /di chuyển file
        protected string _secondaryValue;
        public File_Manager(string rootPath,HttpRequest request)
        {
            _rootPath = rootPath;
            _command = request.Query["cmd"].ToString();
            _value = request.Query["value"].ToString();
            _secondaryValue = request.Query["secondaryValue"].ToString();
        }

        public FileManagerResponse ExcuteCmd()
        {
            FileManagerResponse response = new();
            try
            {
                switch(_command)
                    {
                       case "GET_ALL_DIR":
                            {
                                response.Data = GetAllDirs();
                                break;
                            }
                       default:
                            break;
                    }    

            }
            catch(Exception ex)
                {
                    response.Success = false;
                    response.Message = ex.Message;
                    response.Data = null;
                }
                 return response;
            
        }
        public string[] GetAllDirs()
        {
            var dirs = Directory.GetDirectories(_rootPath, "*", SearchOption.AllDirectories);
            for (int i = 0; i < dirs.Length; i++)
            {
                dirs[i] = dirs[i].Replace(_rootPath, string.Empty).Trim(Path.DirectorySeparatorChar); // Ký tự phân cách thư mục 'Lấy dấu đường dẫn tùy vào HĐH'
            }
            return dirs.OrderBy(d => d).ToArray();
        }

        //Thông tin phản hồi
        public class FileManagerResponse 
        {
            public object Success { get; set; }
            public object Message { get; set; }
            public object Data { get; set; }
        }
    }
}
