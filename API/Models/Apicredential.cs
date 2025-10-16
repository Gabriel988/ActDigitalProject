using System;
using System.Collections.Generic;

namespace GeneralTools.Models;

public partial class Apicredential
{
    public int Id { get; set; }

    public string? ApiName { get; set; }

    public string? ApiUser { get; set; }

    public string? ApiPass { get; set; }
}
