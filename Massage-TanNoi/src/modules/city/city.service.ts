import makeQuery from "@app/core/database/query";
import cityCollection from "./city.collection";

const createCity =async(City:any) =>{
    return await cityCollection.create(City)
    }

    const fetchAllCity = async(params:any,options:any) =>{
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
     
      return cityCollection.aggregatePaginate(
        cityCollection.aggregate(aggregate),
        options
      );
    }
    const getCityById = async (id:any) =>{
      return await cityCollection.findById(id).lean().exec();
    }

    const findByIdAndUpdateCity = async (id:string,City:any)=>{
      return makeQuery(cityCollection.findByIdAndUpdate(id,{$set:City},{new:true}).lean().exec());
    }

    const findByIdAndDeleteCity = async (id: any) => {
        const dataCity = await cityCollection.findByIdAndDelete(id);
      return dataCity;
    };

    export default {
      createCity,
      findByIdAndUpdateCity,
      getCityById,
      findByIdAndDeleteCity,
      fetchAllCity
    }