namespace GeneralTools.Models
{
    public class ValidationObj
    {
        public string message { get; set; }

        public ValidationObj(string msg)
        {
            this.message = msg;
        }

        public ValidationObj()
        {
            this.message = string.Empty;
        }
    }
}
