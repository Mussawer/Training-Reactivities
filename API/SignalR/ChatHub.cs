using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;

        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendComment(CreateComment.Command command){
            var comment = await _mediator.Send(command);

            // any time that a comment is sent to that group
            // then they are going to receive that new comment based on this method
            // and each activity will have its own group of clients
            await Clients.Group(command.ActivityId.ToString()).SendAsync("ReceiveComment", comment.Value);
        }

        // when clients connect to the hub we want to join them in a group
        // by overriding a method inside a hub  
        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();

            // whenever a client connects, join them to a group with the name of the activity id
            var activityId = httpContext.Request.Query["activityId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, activityId);

            // this row send list of comments from our database to the client 
            // who has joined the group
            var result = await _mediator.Send(new CommentList.Query{ActivityId=Guid.Parse(activityId)});
            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }
    }
}