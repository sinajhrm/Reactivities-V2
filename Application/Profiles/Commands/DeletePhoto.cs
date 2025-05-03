using System;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace Application.Profiles.Commands;

public class DeletePhoto
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string PhotoId { get; set; }
    }

    public class Handler(AppDbContext context, IUserAccessor userAccessor, IPhotoService photoService) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserWithPhotosAsync();
            var photo = user.Photos.FirstOrDefault(i => i.Id == request.PhotoId);

            if (photo == null) return Result<Unit>.Failure("Cannot find the photo!", 404);
            if (photo.Url == user.ImageUrl) return Result<Unit>.Failure("Cannot delete the main photo!", 400);

            await photoService.DeletePhoto(photo.PublicId);

            user.Photos.Remove(photo);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem deleting the photo from the database!", 400);
        }
    }
}
