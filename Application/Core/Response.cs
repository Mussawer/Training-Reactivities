namespace Application.Core
{
    public class Response<T>
    {
        public bool IsSuccess { get; set; }
        // T is for the return type T is a generic type 
        public T Value { get; set; }
        public string Error { get; set; }

        //exp if we find the activity either it is going to be the activity or null
        // so if value is null then return not found 
        public static Response<T> Success(T value)
        {
            return new Response<T> { IsSuccess = true, Value = value };
        }

        // failure lets us do some logic based on whether or not something has gone wrong 
        // inside handler itself 
        public static Response<T> Failure(string error)
        {
            return new Response<T> { IsSuccess = false, Error = error };
        }

    }
}