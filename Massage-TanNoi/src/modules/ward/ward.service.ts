import makeQuery from "@app/core/database/query";
import wardCollection from "./ward.collection";

const createWard =async(Ward:any) =>{
    return await wardCollection.create(Ward)
    }

    const fetchAllWard = async(params:any,options:any) =>{
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
     
      return wardCollection.aggregatePaginate(
        wardCollection.aggregate(aggregate),
        options
      );
    }
    const getWardById = async (id:any) =>{
      return await wardCollection.findById(id).lean().exec();
    }

    const findByIdAndUpdateWard = async (id:string,Ward:any)=>{
      return makeQuery(wardCollection.findByIdAndUpdate(id,{$set:Ward},{new:true}).lean().exec());
    }

    const findByIdAndDeleteWard = async (id: any) => {
        const dataWard = await wardCollection.findByIdAndDelete(id);
      return dataWard;
    };

    export default {
      createWard,
      findByIdAndUpdateWard,
      getWardById,
      findByIdAndDeleteWard,
      fetchAllWard
    }