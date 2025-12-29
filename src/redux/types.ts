export interface ReduxSlice<D extends object, S extends object> {
  data: D;
  status: S;
}
