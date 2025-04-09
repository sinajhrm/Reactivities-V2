using System;
using System.Runtime;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{
    public class Command : IRequest
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.
            FindAsync([request.Id], cancellationToken) ?? throw new Exception("Cannot find activity while deleting!");

            context.Remove(activity);

            await context.SaveChangesAsync(cancellationToken);

        }
    }
}
