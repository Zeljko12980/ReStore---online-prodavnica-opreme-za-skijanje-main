using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities.OrderAggregate
{
    public class Order
    {
        public int Id{get;set;}
        public string BuyerId{get;set;}
        public ShippingAdress ShippingAdress{get;set;}
        public DateTime OrderDate{get;set;}=DateTime.Now;
        public List<OrderItem> OrderItems {get;set;}
        public long Subtotal{get;set;}
        public long DeliveryFee{get;set;}
        public OrderStatus OrderStatus{get;set;}=OrderStatus.Pending;

        public long GetTotal()
        {
            return Subtotal+DeliveryFee;
        }
        
    }
}