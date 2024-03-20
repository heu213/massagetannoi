import makeQuery from "@app/core/database/query";
import employeeCollection from "./employee.collection";
import { get } from "lodash";

const createEmployee =async(Employee:any) =>{
    return await employeeCollection.create(Employee)
    }

    const fetchAllEmployee = async(params:any,options:any) =>{
      const {keyword} = params;
      const $match:any ={};
      if(keyword){
        const $or = [
          {'employeeName': new RegExp(keyword,'i')},
          {'employeeCode': new RegExp(keyword,'i')},
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
            employeeCode: -1
          }
        }
      ]
     
      return await employeeCollection.aggregate(aggregate);
    }
    const getEmployeeById = async (id:any) =>{
      return await employeeCollection.findById(id).lean().exec();
    }
    const findByIdAndUpdateEmployee = async (id:string,Employee:any)=>{
      return makeQuery(employeeCollection.findByIdAndUpdate(id,{$set:Employee},{new:true}).lean().exec());
    }
    const findByIdAndDeleteEmployee = async (id: any) => {
        const dataEmployee = await employeeCollection.findByIdAndDelete(id);
      return dataEmployee;
    };
    const autoCodeIncrementEmployee = async () => {
      let str = '';
      const listGroupEmployee = await employeeCollection.find();
      let arr = [];
      if (listGroupEmployee.length === 0) {
        str = "MS" + '01';
      } else {  
        for (let i = 0; i < listGroupEmployee.length; i++) {
          const partner = listGroupEmployee[i];
          const result = get(partner, 'employeeCode').split("MS")[1];
          arr.push(result);
        }
        const maxValue = Math.max(...arr.map(value => parseInt(value, 10))) + 1;
        const formattedMaxValue = maxValue.toString().padStart(arr[0].length, '0');
        str = "MS" + formattedMaxValue;
      }
      return str;
    }
    export default {
      createEmployee,
      findByIdAndUpdateEmployee,
      getEmployeeById,
      findByIdAndDeleteEmployee,
      fetchAllEmployee,
      autoCodeIncrementEmployee,
    }