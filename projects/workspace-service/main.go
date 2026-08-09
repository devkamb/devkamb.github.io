package main

import("encoding/json";"net/http";"sync")
type Operation struct{ID string `json:"id"`; ClientID string `json:"clientId"`; Type string `json:"type"`; Payload map[string]any `json:"payload"`}
type Store struct{mu sync.RWMutex; seen map[string]bool; operations []Operation}
func(s *Store) append(w http.ResponseWriter,r *http.Request){var op Operation;if json.NewDecoder(r.Body).Decode(&op)!=nil||op.ID==""||op.ClientID==""{write(w,400,map[string]string{"error":"id, clientId, and valid JSON are required"});return};s.mu.Lock();defer s.mu.Unlock();if s.seen[op.ID]{write(w,200,map[string]any{"accepted":false,"duplicate":true});return};s.seen[op.ID]=true;s.operations=append(s.operations,op);write(w,201,map[string]any{"accepted":true,"sequence":len(s.operations)})}
func(s *Store) list(w http.ResponseWriter,_ *http.Request){s.mu.RLock();defer s.mu.RUnlock();write(w,200,map[string]any{"operations":s.operations})}
func write(w http.ResponseWriter,status int,v any){w.Header().Set("content-type","application/json");w.WriteHeader(status);_ = json.NewEncoder(w).Encode(v)}
func routes(s *Store) http.Handler{m:=http.NewServeMux();m.HandleFunc("GET /healthz",func(w http.ResponseWriter,_ *http.Request){write(w,200,map[string]string{"status":"ok"})});m.HandleFunc("POST /operations",s.append);m.HandleFunc("GET /operations",s.list);return m}
func main(){s:=&Store{seen:map[string]bool{}};http.ListenAndServe(":8092",routes(s))}
