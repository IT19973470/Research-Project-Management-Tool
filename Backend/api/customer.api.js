import randomBytes from 'crypto';
import {DB} from "../db/DB.js";

export default class CustomerApi {

    cart = DB.cart;
    wishList = DB.wishList;

    addToCart(item) {
        let itemObj = {};
        Object.assign(itemObj, DB.items.get(item.itemId));
        itemObj.id = 'I' + item.itemId + 'C' + item.customerId;
        itemObj.itemId = item.itemId;
        itemObj.qty = 1;
        itemObj.customerId = item.customerId;
        this.cart.set('I' + item.itemId + 'C' + item.customerId, itemObj);
        return itemObj;
    }

    addToWishList(item) {
        let itemObj = {};
        Object.assign(itemObj, DB.items.get(item.itemId));
        itemObj.id = 'I' + item.itemId + 'C' + item.customerId;
        itemObj.itemId = item.itemId;
        itemObj.customerId = item.customerId;
        this.wishList.set('I' + item.itemId + 'C' + item.customerId, itemObj);
        return itemObj;
    }

    getCart(customerId) {
        return Array.from(this.cart.values()).filter(item => {
            console.log(item.customerId === customerId)
            return item.customerId == customerId;
        })
    }

    getWishList(customerId) {
        return Array.from(this.wishList.values()).filter(item => {
            return item.customerId == customerId
        })
    }

    purchase(items) {
        DB.cart = new Map();
        this.cart = DB.cart;
        let itemObj;
        for (let item of items.items) {
            DB.purchased.set(item.id, item);
            itemObj = DB.items.get(item.itemId);
            itemObj.qty -= item.qty;
            DB.items.set(itemObj.id, itemObj)
        }
    }
}