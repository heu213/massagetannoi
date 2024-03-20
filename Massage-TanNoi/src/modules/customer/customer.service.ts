import makeQuery from "@app/core/database/query";
import customerCollection from "./customer.collection";

const createCustomer =async(Customer:any) =>{
    return await customerCollection.create(Customer)
    }

    const fetchAllCustomer = async(params:any,options:any) =>{
      const {keyword} = params;
      const $match:any ={};
      if(keyword){
        const $or = [
          {'name': new RegExp(keyword,'i')},
          {'level': Number(keyword)},
        ]
        const $and = [{$or}]
        Object.assign($match,{$and})
      }
      const aggregate:any = [
        {$match}
      ]
     
      return await customerCollection.aggregatePaginate(
        customerCollection.aggregate(aggregate),
        options
      );
    }
    const getCustomerById = async (id:any) =>{
      return await customerCollection.findById(id).lean().exec();
    }
    const findByIdAndUpdateCustomer = async (id:string,Customer:any)=>{
      return makeQuery(customerCollection.findByIdAndUpdate(id,{$set:Customer},{new:true}).lean().exec());
    }
    const findByIdAndDeleteCustomer = async (id: any) => {
        const dataCustomer = await customerCollection.findByIdAndDelete(id);
      return dataCustomer;
    };
    export default {
      createCustomer,
      findByIdAndUpdateCustomer,
      getCustomerById,
      findByIdAndDeleteCustomer,
      fetchAllCustomer
    }