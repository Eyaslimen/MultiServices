using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MultiServices.Migrations
{
    /// <inheritdoc />
    public partial class updat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Post",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Post",
                table: "Employees");
        }
    }
}
