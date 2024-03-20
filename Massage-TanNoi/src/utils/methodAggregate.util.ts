

/**
 * Generates a $lookup stage for MongoDB aggregation pipeline.
 *
 * @param {string} from - The name of the collection to perform the join with.
 * @param {string} localField - The field from the input documents.
 * @param {string} as - The name of the new array field to add to the input documents.
 * @param {string} [foreignField='_id'] - The field from the documents of the "from" collection to match against.
 * @return {object} The $lookup stage object for the aggregation pipeline.
 */
const _lookup =(from:string,localField:string,as:string,foreignField:string='_id')=>({
  $lookup: { from,localField,foreignField,as },
});
/**
 * 
 * @param {string} path 
 * @param {boolean} preserveNullAndEmptyArrays 
 * @returns 
 */
const _unwind=(path:string,preserveNullAndEmptyArrays:boolean=true)=>({$unwind:{path,preserveNullAndEmptyArrays }});


/**
 * Returns a regex match object based on the given value and path.
 *
 * @param {string} value - The regex pattern to match.
 * @param {string} path - The path to the string value to be matched against.
 * @return {object} - The regex match object.
 */

const _regexMatch =(value:string,path:string)=>({
  $regexMatch: {
    input: '$' + path,
    regex: value,
    options: 'i',
  }})

  /**
   * Generates a regular expression object to perform a case-insensitive search for a given value.
   *
   * @param {string} value - The value to search for.
   * @return {object} - The regular expression object with a pattern and options.
   */
  const _regex =(value:string)=>({
    $regex: '.*'+value.trim()+'.*$',
    $options: 'i',
  });


export default {
  lookup: _lookup,
  unwind: _unwind,
  regexMatch : _regexMatch,
  regex: _regex
}