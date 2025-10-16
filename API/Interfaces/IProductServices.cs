using GeneralTools.Models;

namespace GeneralTools.Interfaces
{
    public interface IProductServices
    {
        public Task<List<Product>> ListProduct(bool? status);
        Task SaveProduct(Product product);
        Task UpadateProduct(Product product);
        Task<Product> GetProduct(int id);
        Task DeleteProduct(int id);
    }
}
