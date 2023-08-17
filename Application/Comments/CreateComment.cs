using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class CreateComment
    {
        public class Command : IRequest<Response<CommentDTO>>
        {
            public string Body { get; set; }
            public Guid ActivityId { get; set; }
        }
        public class CommandValidator : AbstractValidator<CommentDTO>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Response<CommentDTO>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Response<CommentDTO>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.ActivityId);

                if(activity == null) return null;

                var user = await _context.Users.Include(p => p.Photos).SingleOrDefaultAsync(x=> x.UserName==_userAccessor.GetUserName());

                var comment = new Comment{
                    Author = user,
                    Activity = activity,
                    Body = request.Body
                };

                activity.Comments.Add(comment);

                var success= await _context.SaveChangesAsync() > 0;

                if(success) return Response<CommentDTO>.Success(_mapper.Map<CommentDTO>(comment));

                return Response<CommentDTO>.Failure("Failed to add comment");


            }
        }
    }
}