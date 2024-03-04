using Microsoft.AspNetCore.Mvc;
using NDExplorer.common;

namespace NDExplorer.Controllers
{
        [ApiController]
        [Route("ndexplorer")]
        public class FilerManagerController : Controller
        {
        File_Manager _fm;
        public IActionResult ExcuteCmd ([FromServices]IWebHostEnvironment env)
            {
                // Lấy đường dẫn thư mục upload
                var wwwroot = env.WebRootPath;

                // Nối chuỗi để có đường dẫn thư mục upload
                var uploadPath = Path.Combine(wwwroot, "upload");
                _fm = new File_Manager(uploadPath, Request);

                return Ok(_fm.ExcuteCmd());
            }
            
        }
}
