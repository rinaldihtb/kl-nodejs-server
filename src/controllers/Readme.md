# Controller Usage
## Implementation
#### Put your code inside action method. Example : 
```typescript   
class HelloController extends BaseController {
    protected action(): ResultResponse {

        /// Put your logic in here
        return Result.success("Hello There");
    }
}
```

## Returning Response 

### Success
```typescript
// String
return Result.success("Hello there");

// Object
const greeting : {
    message: "Hi There"
}
return Result.success(greeting);

// With HTTP Status Code
const greeting : {
    greet: "Hi There"
}
const params : {
    statusCode: 200
}
return Result.success(greeting, params);
```
### Error 

```typescript
// String
const error = "Error"
return Result.withError("Bad Request", {error : error});

// Object
const params = {
    error: {}
}
return Result.withError("Bad Request", params);

// with Status Code
const params = {
    statusCode: 404
}
return Result.withError("Bad Request", params);
```