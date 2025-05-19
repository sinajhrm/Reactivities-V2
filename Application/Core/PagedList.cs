using System;

namespace Application.Core;

public class PagedList<T, TCursor>
{
    public required List<T> Items { get; set; }
    public TCursor? NextCursor { get; set; }
}
