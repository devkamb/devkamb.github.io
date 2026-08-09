package main
import("bytes";"net/http";"net/http/httptest";"testing")
func TestOperationAppendIsIdempotent(t *testing.T){s:=&Store{seen:map[string]bool{}};body:=`{"id":"op-1","clientId":"c-1","type":"add","payload":{"x":1}}`;for i:=0;i<2;i++{w:=httptest.NewRecorder();routes(s).ServeHTTP(w,httptest.NewRequest(http.MethodPost,"/operations",bytes.NewBufferString(body)));if w.Code!=201&&!(i==1&&w.Code==200){t.Fatalf("status=%d",w.Code)}};if len(s.operations)!=1{t.Fatalf("operations=%d",len(s.operations))}}
