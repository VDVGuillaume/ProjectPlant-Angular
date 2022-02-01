using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GardenApi.Models
{
    public class Comment
    {
        #region Properties
        public int Id { get; set; }
        public string CommentText { get; set; }
        public DateTime DateAdded { get; set; }
        #endregion

        #region Constructors

        public Comment(string commentText)
        {
            DateAdded = DateTime.Now;
            CommentText = commentText;
        }

        #endregion


    }
}
