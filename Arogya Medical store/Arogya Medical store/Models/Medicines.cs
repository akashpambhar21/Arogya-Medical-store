namespace Arogya_Medical_store.Models
{
    public class Medicines
    {
        public int ID { get; set; }
        public string name { get; set; }
        public string manufacturer { get; set; }
        public Decimal unitPrice { get; set; }
        public int quantity { get; set; }
        public string imageUrl { get; set; }
    }
}
