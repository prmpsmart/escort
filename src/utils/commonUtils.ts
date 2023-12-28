export function log(...p: any) {
  console.log(...p);
}

export function cleanItem(item: any): any {
  let obj = item.toObject();
  obj.id = obj._id;
  delete obj.password;
  delete obj._id;
  delete obj.__v;
  return obj;
}
