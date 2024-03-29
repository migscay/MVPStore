﻿// <auto-generated />
using System;
using MVPStore.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace MVPStore.Migrations
{
    [DbContext(typeof(MVPStoreContext))]
    [Migration("20210705063005_MVPStoreMigration")]
    partial class MVPStoreMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.15")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MVPStore.Models.Customer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("varchar(150)")
                        .HasMaxLength(150)
                        .IsUnicode(false);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(100)")
                        .HasMaxLength(100)
                        .IsUnicode(false);

                    b.HasKey("Id");

                    b.ToTable("Customer");
                });

            modelBuilder.Entity("MVPStore.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(100)")
                        .HasMaxLength(100)
                        .IsUnicode(false);

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(10, 2)");

                    b.HasKey("Id");

                    b.ToTable("Product");
                });

            modelBuilder.Entity("MVPStore.Models.Sales", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CustomerId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<DateTime>("DateSold")
                        .HasColumnType("date");

                    b.Property<int?>("ProductId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<int?>("StoreId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.HasIndex("ProductId");

                    b.HasIndex("StoreId");

                    b.ToTable("Sales");
                });

            modelBuilder.Entity("MVPStore.Models.Store", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("varchar(150)")
                        .HasMaxLength(150)
                        .IsUnicode(false);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(100)")
                        .HasMaxLength(100)
                        .IsUnicode(false);

                    b.HasKey("Id");

                    b.ToTable("Store");
                });

            modelBuilder.Entity("MVPStore.Models.Sales", b =>
                {
                    b.HasOne("MVPStore.Models.Customer", "Customer")
                        .WithMany("Sales")
                        .HasForeignKey("CustomerId")
                        .HasConstraintName("FK__Sales__CustomerI__398D8EEE")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MVPStore.Models.Product", "Product")
                        .WithMany("Sales")
                        .HasForeignKey("ProductId")
                        .HasConstraintName("FK__Sales__ProductId__38996AB5")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MVPStore.Models.Store", "Store")
                        .WithMany("Sales")
                        .HasForeignKey("StoreId")
                        .HasConstraintName("FK__Sales__StoreId__3A81B327")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
