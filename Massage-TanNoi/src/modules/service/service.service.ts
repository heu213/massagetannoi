import makeQuery from "@app/core/database/query";
import serviceCollection from "./service.collection";

const createService =async(Service:any) =>{
    return await serviceCollection.create(Service)
    }

    const fetchAllService = async(params:any,options:any) =>{
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
     
      return serviceCollection.aggregatePaginate(
        serviceCollection.aggregate(aggregate),
        options
      );
    }
    const getServiceById = async (id:any) =>{
      return await serviceCollection.findById(id).lean().exec();
    }

    const findByIdAndUpdateService = async (id:string,Service:any)=>{
      return makeQuery(serviceCollection.findByIdAndUpdate(id,{$set:Service},{new:true}).lean().exec());
    }

    const findByIdAndDeleteService = async (id: any) => {
        const dataService = await serviceCollection.findByIdAndDelete(id);
      return dataService;
    };

    export default {
      createService,
      findByIdAndUpdateService,
      getServiceById,
      findByIdAndDeleteService,
      fetchAllService
    }