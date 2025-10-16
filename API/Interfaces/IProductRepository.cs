using GeneralTools.Models;

namespace GeneralTools.Interfaces
{
    public interface IProductRepository
    {
        Task<List<Product>> ListProduct();
        Task SaveProduct(Product product);
        public void UpadateProduct(Product product);
        public Product GetProduct(int id);
        public void DeleteProduct(int id);
    }
}
