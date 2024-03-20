import makeQuery from "@app/core/database/query";
import billItemCollection from "./billItem.collection";
import { get } from "lodash";

const createBillItem =async(BillItem:any) =>{
    return await billItemCollection.create(BillItem)
    }

    const fetchAllBillItem = async(params:any,options:any) =>{
      const {keyword} = params;
      const $match:any ={};
      if(keyword){
        const $or = [
          {'billItemName': new RegExp(keyword,'i')},
          {'billItemCode': new RegExp(keyword,'i')},
          {'ticketType': new RegExp(keyword,'i')},
          {'managementArea':{ $elemMatch: { fullAddress: new RegExp(keyword,'i') }}}

        ]
        const $and = [{$or}]
        Object.assign($match,{$and})
      }
      const aggregate:any = [
        {
          $lookup: {
            from: 'service',
            let: { serviceIds: { $ifNull: ['$service', []] } },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ['$_id', '$$serviceIds']
                  }
                }
              },
            ],
            as: 'resultService'
          }
        },
        {$match}
        ,
        {
          $sort: {
            billItemCode: -1
          }
        }
      ]
     
      return await billItemCollection.aggregatePaginate(
        billItemCollection.aggregate(aggregate),
        options
      );
    }
    const getBillItemById = async (id:any) =>{
      return await billItemCollection.findById(id).lean().exec();
    }
    const findByIdAndUpdateBillItem = async (id:string,BillItem:any)=>{
      return makeQuery(billItemCollection.findByIdAndUpdate(id,{$set:BillItem},{new:true}).lean().exec());
    }
    const findByIdAndDeleteBillItem = async (id: any) => {
        const dataBillItem = await billItemCollection.findByIdAndDelete(id);
      return dataBillItem;
    };
    const autoCodeIncrementBillItem = async () => {
      let str = '';
      const listGroupBillItem = await billItemCollection.find();
      let arr = [];
      if (listGroupBillItem.length === 0) {
        str = "MS" + '01';
      } else {  
        for (let i = 0; i < listGroupBillItem.length; i++) {
          const partner = listGroupBillItem[i];
          const result = get(partner, 'billItemCode').split("MS")[1];
          arr.push(result);
        }
        const maxValue = Math.max(...arr.map(value => parseInt(value, 10))) + 1;
        const formattedMaxValue = maxValue.toString().padStart(arr[0].length, '0');
        str = "MS" + formattedMaxValue;
      }
      return str;
    }
    export default {
      createBillItem,
      findByIdAndUpdateBillItem,
      getBillItemById,
      findByIdAndDeleteBillItem,
      fetchAllBillItem,
      autoCodeIncrementBillItem,
    }