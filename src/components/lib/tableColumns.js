export const getPokemonColumns = () => ([
  { header: " ",
  thClassName: "!border-b-0 !p-0 text-center h-[15px]",
    columns: [
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
      thClassName: "pl-3"
    },
    {
      accessorKey: "types",
      header: "Types",
      cell: (info) => info.getValue(),
      enableSorting: false,
    }]},
    {
      header: "Stats",
      thClassName: "text-center h-[15px] translate-y-3 !p-0 align-bottom !border-b-0" ,
      columns: [
        {
          accessorKey: "height",
          header: "Ht",
          cell: (info) => info.getValue(),
          enableSorting: false,
        },
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