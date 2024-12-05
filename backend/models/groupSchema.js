const groupSchema = {
    name: {
      type: String,
      required: true,
      trim: true
    },
    avatar: {
      type: String,
      default: 'https://cdn-icons-png.flaticon.com/512/9790/9790561.png'
    },
    description: String,
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    members: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member'
      },
      joinedAt: {
        type: Date,
        default: Date.now
      }
    }],
    memberLimit: {
      type: Number,
      default: 5
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  };