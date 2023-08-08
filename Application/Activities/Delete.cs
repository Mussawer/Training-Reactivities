using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest<Response<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Response<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Response<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                if (activity == null)
                {
                    return null;
                }
                _context.Remove(activity);
                var result = await _context.SaveChangesAsync() > 0;
                if (result)
                {
                    return Response<Unit>.Success(Unit.Value);
                }
                else
                {
                    return Response<Unit>.Failure("Failed to delete Activity");
                }
            }
        }
    }
}