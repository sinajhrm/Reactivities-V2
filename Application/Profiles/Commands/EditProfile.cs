using System;
using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class EditProfile
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string DisplayName { get; set; } = string.Empty;
        public string? Bio { get; set; }
    }

    public class Handler(IUserAccessor userAccessor, AppDbContext dbContext) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var userProfile = await userAccessor.GetUserAsync();

            if (userProfile == null) return Result<Unit>.Failure("No user is logged in!", 400);

            if (userProfile.Bio == request.Bio && userProfile.DisplayName == request.DisplayName) return Result<Unit>.Success(Unit.Value);

            // Or comment the above line and uncomment the following line! (IDK which one is better...)
            // context.Entry(user).State = EntityState.Modified;

            userProfile.Bio = request.Bio;
            userProfile.DisplayName = request.DisplayName;

            var result = await dbContext.SaveChangesAsync() > 0;

            if (!result) return Result<Unit>.Failure("Failed to update user profile in database!", 500);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
