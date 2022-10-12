export const getPokemonColumns = () => ([
    {
      accessorKey: "image",
      header: "",
      cell: (info) => info.getValue(),
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "abilitiesComponent",
      header: "Abilities",
      cell: (info) => info.getValue(),
      enableSorting: false,
    },
    {
      accessorKey: "typeComponent",
      header: "Type",
      cell: (info) => info.getValue(),
      enableSorting: false,
    },
    {
      accessorKey: "types",
      header: "Types",
      cell: (info) => info.getValue(),
      enableSorting: false,
    },
    {
      accessorKey: "height",
      header: "Height",
      cell: (info) => info.getValue(),
      enableSorting: false,
    },
    {
      header: "Stats",
      columns: [
        {
          accessorKey: "hp",
          header: "Hp",
          cell: (info) => info.getValue(),
          enableSorting: false,
        },
        {
          accessorKey: "attack",
          header: "Atk",
          cell: (info) => info.getValue(),
          enableSorting: false,
        },
        {
          accessorKey: "defense",
          header: "Def",
          cell: (info) => info.getValue(),
          enableSorting: false,
        },
        {
          accessorKey: "special-attack",
          header: "S.Atk",
          cell: (info) => info.getValue(),
          enableSorting: false,
        },
        {
          accessorKey: "special-defense",
          header: "S.Def",
          cell: (info) => info.getValue(),
          enableSorting: false,
        },
        {
          accessorKey: "speed",
          header: "Spd",
          cell: (info) => info.getValue(),
          enableSorting: false,
        },
      ],
    },
  ])